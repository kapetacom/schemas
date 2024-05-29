package com.kapeta.schemas;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.ValidationMessage;
import org.junit.jupiter.api.Test;

import java.util.Set;

public class MhoTest {



    @Test
    public void test() throws Exception {

        String type = "core/rest-method";
        JsonSchema conceptSchema = Schemas.getInstance().typeSchema(type);

        // Step 2: Read the YAML file and convert it to a JSON object
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(this.getClass().getResourceAsStream("/test.json"));

        // Step 3: Validate the JSON object against the JSON Schema
        Set<ValidationMessage> validationMessages = conceptSchema.validate(jsonNode);
        System.out.println("validationMessages = " + validationMessages);
    }
}
