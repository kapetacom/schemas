package com.kapeta.schemas;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kapeta.schemas.entity.Concept;
import com.kapeta.schemas.entity.ConceptSpec;
import com.kapeta.schemas.entity.Dependency;
import com.kapeta.schemas.entity.Metadata;
import com.networknt.schema.*;
import com.networknt.schema.uri.URIFactory;
import com.networknt.schema.urn.URNFactory;
import lombok.Data;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Schemas {

    private static Schemas instance;


    public static Schemas getInstance() {
        if (instance == null) {
            instance = new Schemas();
        }
        return instance;
    }

    private final Set<String> schemaProviderKinds;

    private final ObjectMapper om;

    private final URI baseURI = URI.create("kapeta://schemas");

    private Schemas() {
        om = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        this.schemaProviderKinds = this.readSchemaProviderKinds().stream()
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
    }

    private Set<String> readSchemaProviderKinds() {
        JsonNode json = json("/config/schema-provider-kinds.json");
        return om.convertValue(json, om.getTypeFactory().constructCollectionType(Set.class, String.class));
    }

    public boolean isCoreConcept(String kind) {
        return kind.startsWith("core/");
    }

    public SchemaProviderType concept(String concept) {
        JsonNode conceptJson = jsonSchema("concepts/" + concept + ".json");
        if (conceptJson == null) {
            return null;
        }

        return SchemaProviderType.from(conceptJson);
    }


    public JsonSchema abstractSchema(String type) {
        JsonNode schemaJson = jsonSchema("abstracts/" + type + ".json");

        return toSchema(schemaJson);
    }

    public JsonSchema typeSchema(String type) {
        JsonNode schemaJson = jsonSchema("types/" + type + ".json");

        return toSchema(schemaJson);
    }

    public JsonSchema kindSchema() {
        return abstractSchema("core/kind");
    }

    public JsonSchema toSchema(Map<String, Object> schemaJson) {
        return toSchema(om.convertValue(schemaJson, JsonNode.class));
    }

    public JsonSchema toSchema(JsonNode schemaJson) {
        SpecVersion.VersionFlag versionFlag = schemaJson.has("$schema") ?
                SpecVersionDetector.detect(schemaJson) : SpecVersion.VersionFlag.V7;
        JsonSchemaFactory factory = JsonSchemaFactory.builder(JsonSchemaFactory.getInstance(versionFlag))
                .uriFactory(new InternalURIFactory(), "kapeta", "file", "jar")
                .addUrnFactory(new InternalURNFactory())
                .build();

        JsonSchema out = factory.getSchema(baseURI, schemaJson);
        out.initializeValidators();
        return out;
    }

    public JsonNode jsonSchema(String path) {
        return json("/schemas/" + path);
    }

    private JsonNode json(String path) {
        try {
            InputStream resource = Schemas.class.getResourceAsStream(path);
            if (resource == null) {
                throw new IllegalArgumentException("File not found: " + path);
            }
            return om.readTree(resource);
        } catch (IOException e) {
            return null;
        }
    }

    public boolean isSchemaProviderType(String kind) {
        return schemaProviderKinds.contains(kind.toLowerCase());
    }
    public boolean isSchemaProviderTypeLike(JsonNode assetNode) {
        //Determine if asset has the things that make up a Schema Provider Type
        return assetNode.has("kind") &&
                assetNode.has("spec") &&
                assetNode.has("metadata") &&
                assetNode.get("spec").has("schema");
    }

    /**
     * Used to wrap and operate a kind that provides schema.
     * These
     */
    @Data
    public static class SchemaProviderType {

        private String kind;

        private Metadata metadata = new Metadata();

        private SchemaProviderTypeSpec spec = new SchemaProviderTypeSpec();

        public static SchemaProviderType from(JsonNode schema) {
            return from(Schemas.getInstance().om.convertValue(schema, Concept.class));
        }
        public static SchemaProviderType from(Concept concept) {
            SchemaProviderType out = new SchemaProviderType();
            out.setKind(concept.getKind().toValue());
            out.setMetadata(concept.getMetadata());
            SchemaProviderTypeSpec coreSpec = new SchemaProviderTypeSpec();
            if (concept.getSpec() != null) {
                ConceptSpec spec = concept.getSpec();
                if (spec.getDependencies() != null) {
                    coreSpec.dependencies.addAll(spec.getDependencies());
                }

                if (spec.getSchema() != null)  {
                    coreSpec.setSchema(Schemas.getInstance().toSchema(spec.getSchema()));
                }
            }


            out.setSpec(coreSpec);

            return out;
        }

        private SchemaProviderType() {}
    }

    @Data
    public static class SchemaProviderTypeSpec {

        private Set<Dependency> dependencies = new HashSet<>();

        private JsonSchema schema;
        private SchemaProviderTypeSpec() {}

    }

    public static class InternalURNFactory implements URNFactory {

        @Override
        public URI create(String urn) {
            String path = "/schemas/types" + urn + ".json";
            URL resource = Schemas.class.getResource(path);
            if (resource == null) {
                return URI.create(path);
            }

            try {
                return resource.toURI();
            } catch (URISyntaxException e) {
                throw new RuntimeException(e);
            }
        }
    }
    public static class InternalURIFactory implements URIFactory {

        @Override
        public URI create(String uri) {
            try {
                if (uri.startsWith("file:/")) {
                    return URI.create(uri);
                }

                String path = "/schemas/types" + uri + ".json";
                URL resource = Schemas.class.getResource(path);
                if (resource == null) {
                    return URI.create(uri);
                }
                return resource.toURI();
            } catch (URISyntaxException e) {
                throw new RuntimeException(e);
            }
        }

        @Override
        public URI create(URI baseURI, String segment) {
            return create(segment);
        }
    }
}
