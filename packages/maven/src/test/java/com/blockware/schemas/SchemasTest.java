package com.blockware.schemas;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaException;
import com.networknt.schema.ValidationMessage;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class SchemasTest {

    @Test
    public void can_get_core_concepts() {
        Schemas.SchemaProviderType blockType = Schemas.getInstance().concept("core/block-type");

        assertNotNull(blockType);
        assertNotNull(blockType.getSpec().getSchema());
        assertTrue(blockType.getSpec().getDependencies().isEmpty());

        Schemas.SchemaProviderType plan = Schemas.getInstance().concept("core/plan");

        assertNotNull(plan);
        assertNotNull(plan.getSpec().getSchema());
        assertFalse(plan.getSpec().getDependencies().isEmpty());
    }


    @Test
    public void can_get_core_types() {
        JsonSchema conceptSchema = Schemas.getInstance().abstractSchema("core/concept");
        assertNotNull(conceptSchema);

        Set<ValidationMessage> validate = conceptSchema.validate(Schemas.getInstance().jsonSchema("concepts/core/block-type.json"));
        assertTrue(validate.isEmpty());

        validate = Schemas.getInstance().kindSchema().validate(Schemas.getInstance().jsonSchema("concepts/core/block-type.json"));
        assertTrue(validate.isEmpty());
    }

    @Test
    public void throws_if_invalid_schema() {


        JsonNode invalidRefsSchema = json("/invalid-refs-schema.json");

        try {
            Schemas.getInstance().toSchema(invalidRefsSchema);
            throw new AssertionError("Did not throw");
        } catch (JsonSchemaException ex) {
            assertTrue(ex.getMessage().contains("/a-ref-that-does-not-exist"));
        }
    }

    private JsonNode json(String path) {
        try {
            InputStream resource = SchemasTest.class.getResourceAsStream(path);
            if (resource == null) {
                throw new IllegalArgumentException("File not found: " + path);
            }
            return new ObjectMapper().readTree(resource);
        } catch (IOException e) {
            return null;
        }
    }
}