package com.blockware.schemas;

import com.networknt.schema.JsonSchema;
import com.networknt.schema.ValidationMessage;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SchemasTest {

    @Test
    public void can_get_core_concepts() {
        Schemas.CoreConcept blockType = Schemas.concept("core/block-type");

        assertNotNull(blockType);
        assertNotNull(blockType.getSpec().getSchema());
        assertTrue(blockType.getSpec().getDependencies().isEmpty());

        Schemas.CoreConcept plan = Schemas.concept("core/plan");

        assertNotNull(plan);
        assertNotNull(plan.getSpec().getSchema());
        assertFalse(plan.getSpec().getDependencies().isEmpty());
    }


    @Test
    public void can_get_core_types() {
        JsonSchema conceptSchema = Schemas.typeSchema("core/concept");
        assertNotNull(conceptSchema);

        Set<ValidationMessage> validate = conceptSchema.validate(Schemas.json("concepts/core/block-type.json"));
        assertTrue(validate.isEmpty());
    }

}