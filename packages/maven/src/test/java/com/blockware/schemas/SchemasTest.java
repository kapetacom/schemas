package com.blockware.schemas;

import com.networknt.schema.JsonSchema;
import com.networknt.schema.ValidationMessage;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class SchemasTest {

    @Test
    public void can_get_core_concepts() {
        Schemas.CoreConcept blockType = Schemas.getInstance().concept("core/block-type");

        assertNotNull(blockType);
        assertNotNull(blockType.getSpec().getSchema());
        assertTrue(blockType.getSpec().getDependencies().isEmpty());

        Schemas.CoreConcept plan = Schemas.getInstance().concept("core/plan");

        assertNotNull(plan);
        assertNotNull(plan.getSpec().getSchema());
        assertFalse(plan.getSpec().getDependencies().isEmpty());
    }


    @Test
    public void can_get_core_types() {
        JsonSchema conceptSchema = Schemas.getInstance().typeSchema("core/concept");
        assertNotNull(conceptSchema);

        Set<ValidationMessage> validate = conceptSchema.validate(Schemas.getInstance().json("concepts/core/block-type.json"));
        assertTrue(validate.isEmpty());

        validate = Schemas.getInstance().kindSchema().validate(Schemas.getInstance().json("concepts/core/block-type.json"));
        assertTrue(validate.isEmpty());
    }

}