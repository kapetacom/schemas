# @kapeta/schemas

Schemas and type definitions for core kapeta types.

## Usage

Runtime schema validation:

```ts
import { validateSchema } from "@kapeta/schemas";

const errors = await validateSchema("core/plan", maybeValidPlan);

console.log(errors);
```

Compile time validation and autocomplete:

```ts
import type { Plan } from "@kapeta/schemas";
```
