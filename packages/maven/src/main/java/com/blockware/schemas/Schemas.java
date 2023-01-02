package com.blockware.schemas;

import com.blockware.schemas.entity.Concept;
import com.blockware.schemas.entity.ConceptSpec;
import com.blockware.schemas.entity.Dependency;
import com.blockware.schemas.entity.Metadata;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.SpecVersionDetector;
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

public class Schemas {

    private static Schemas instance;
    public static Schemas getInstance() {
        if (instance == null) {
            instance = new Schemas();
        }
        return instance;
    }

    private final ObjectMapper om;

    private final URI baseURI = URI.create("blockware://schemas");

    private Schemas() {
        om = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public boolean isCoreConcept(String kind) {
        return kind.startsWith("core/");
    }

    public CoreConcept concept(String concept) {
        JsonNode conceptJson = json("concepts/" + concept + ".json");
        if (conceptJson == null) {
            return null;
        }

        return CoreConcept.from(conceptJson);
    }

    public JsonSchema typeSchema(String type) {
        JsonNode schemaJson = json("types/" + type + ".json");

        return toSchema(schemaJson);
    }

    public JsonSchema kindSchema() {
        return typeSchema("core/kind");
    }

    public JsonSchema toSchema(Map<String, Object> schemaJson) {
        return toSchema(om.convertValue(schemaJson, JsonNode.class));
    }

    public JsonSchema toSchema(JsonNode schemaJson) {
        SpecVersion.VersionFlag versionFlag = schemaJson.has("$schema") ?
                SpecVersionDetector.detect(schemaJson) : SpecVersion.VersionFlag.V7;
        JsonSchemaFactory factory = JsonSchemaFactory.builder(JsonSchemaFactory.getInstance(versionFlag))
                .uriFactory(new InternalURIFactory(), "blockware", "file", "jar")
                .addUrnFactory(new InternalURNFactory())
                .build();

        return factory.getSchema(baseURI, schemaJson);
    }

    public JsonNode json(String path) {
        try {
            String fullPath = "/schemas/" + path;
            InputStream resource = Schemas.class.getResourceAsStream(fullPath);
            if (resource == null) {
                throw new IllegalArgumentException("File not found: " + fullPath);
            }
            return om.readTree(resource);
        } catch (IOException e) {
            return null;
        }
    }

    @Data
    public static class CoreConcept {

        private String kind;

        private Metadata metadata = new Metadata();

        private CoreConceptSpec spec = new CoreConceptSpec();

        public static CoreConcept from(JsonNode schema) {
            return from(Schemas.getInstance().om.convertValue(schema, Concept.class));
        }
        public static CoreConcept from(Concept concept) {
            CoreConcept out = new CoreConcept();
            out.setKind(concept.getKind());
            out.setMetadata(concept.getMetadata());
            CoreConceptSpec coreSpec = new CoreConceptSpec();
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

        private CoreConcept() {}
    }

    @Data
    public static class CoreConceptSpec {

        private Set<Dependency> dependencies = new HashSet<>();

        private JsonSchema schema;
        private CoreConceptSpec() {}

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
