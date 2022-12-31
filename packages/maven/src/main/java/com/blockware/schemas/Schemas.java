package com.blockware.schemas;

import com.blockware.schemas.entity.Concept;
import com.blockware.schemas.entity.Dependency;
import com.blockware.schemas.entity.Metadata;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.SpecVersionDetector;
import com.networknt.schema.uri.URIFactory;
import lombok.Data;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Schemas {

    private final static ObjectMapper om = new ObjectMapper();

    private static final URI baseURI;

    static {
        try {
            baseURI = new URI("blockware://schemas");
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public static boolean isCoreConcept(String kind) {
        return kind.startsWith("core/");
    }

    public static CoreConcept concept(String concept) {
        JsonNode conceptJson = json("concepts/" + concept + ".json");
        if (conceptJson == null) {
            return null;
        }

        return CoreConcept.from(conceptJson);
    }

    public static JsonSchema typeSchema(String type) {
        JsonNode schemaJson = json("types/" + type + ".json");

        return toSchema(schemaJson);
    }

    public static JsonSchema toSchema(Map<String, Object> schemaJson) {
        return toSchema(om.convertValue(schemaJson, JsonNode.class));
    }

    public static JsonSchema toSchema(JsonNode schemaJson) {
        SpecVersion.VersionFlag versionFlag = SpecVersionDetector.detect(schemaJson);
        JsonSchemaFactory factory = JsonSchemaFactory.builder(JsonSchemaFactory.getInstance(versionFlag))
                .uriFactory(new InternalURIFactory(), "blockware", "file")
                .build();

        return factory.getSchema(baseURI, schemaJson);
    }

    public static JsonNode json(String path) {
        try {
            return om.readTree(Schemas.class.getResourceAsStream("/schemas/" + path));
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
            return from(om.convertValue(schema, Concept.class));
        }
        public static CoreConcept from(Concept concept) {
            CoreConcept out = new CoreConcept();
            out.setKind(concept.getKind());
            out.setMetadata(concept.getMetadata());
            CoreConceptSpec spec = new CoreConceptSpec();
            if (concept.getSpec().getDependencies() != null) {
                spec.dependencies.addAll(concept.getSpec().getDependencies());
            }
            spec.setSchema(toSchema(concept.getSpec().getSchema()));
            out.setSpec(spec);

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
