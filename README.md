# Core schemas
Contains the schemas for all core blockware types.

## Concepts
Concepts are top level definitions of the core building blocks of
blockware.

### core/block-type
defines a block type. This typically is some sort of fundamental role
a block can take - such as frontend / backend / desktop / embedded.

In the ```spec``` of the block type you define the schema (using JSON schema)
for the block type. 

If the block type uses resources and/or entities - make sure to also
specific the path to those in ```spec.dependencies``` 
and ```spec.entities```.

**Schema:**
[core/block-type.yml](schemas/concepts/block-type.yml)

**Example:**
[core/block-type.example.yml](schemas/concepts/block-type.example.yml)

### core/block-type-group
A special block type that allows the user to embed multiple connected
blocks into a plan

**Schema:**
[core/block-type-group.yml](schemas/concepts/block-type-group.yml)

**Example:**
[core/block-type-group.example.yml](schemas/concepts/block-type-group.example.yml)

### core/plan
Contains blocks and connections between blocks. This is effectively a blue
print of a software system.


**Schema:**
[core/plan.yml](schemas/concepts/plan.yml)

**Example:**
[core/plan.example.yml](schemas/concepts/plan.example.yml)

### core/deployment-target
Defines a new target where users can deploy their plans. 


**Schema:**
[core/deployment-target.yml](schemas/concepts/deployment-target.yml)

**Example:**
[core/deployment-target.example.yml](schemas/concepts/deployment-target.example.yml)

### core/language-target
Defines a new language target in which a block can be created. 
This typically means a specific programming language and framework
in that language - such as C#.NET or Java Spring Boot

**Schema:**
[core/language-target.yml](schemas/concepts/language-target.yml)

**Example:**
[core/language-target.example.yml](schemas/concepts/language-target.example.yml)

### core/resource-type-internal
Defines internal resources. Internal resources are resources that 
one block can provide to another. The name internal refers
to it being internal communication within your plan.
Typical examples of this would be a REST API being provided by one block
and consumed by a REST Client in another.  

**Schema:**
[core/resource-type-internal.yml](schemas/concepts/resource-type-internal.yml)

**Example:**
[core/resource-type-internal.example.yml](schemas/concepts/resource-type-internal.example.yml)

### core/resource-type-operator
Defines operator resources. An operator resource is something that
can only be consumed by blocks - and is typically an external piece of
software or hardware - such as a database or a disk.

**Schema:**
[core/resource-type-operator.yml](schemas/concepts/resource-type-operator.yml)

**Example:**
[core/resource-type-operator.example.yml](schemas/concepts/resource-type-operator.example.yml)

### core/resource-type-extension
Extension resources defines the interface of a resource - but doesn't
itself provide the implementation. These are meant to standardise
certain operations and a good example could be a credit card payment 
extension. The extension will then define the API by which to communicate
with a generic payment provider. Other blocks can then provide the same
extension type by implementing that exact interface.
The reason for this is to be able to provide standard integrations
to similar types of services - so they can be easily exchanged for others
and when designing a block - you dont have to tie in to a specific provider.

**Schema:**
[core/resource-type-extension.yml](schemas/concepts/resource-type-extension.yml)

**Example:**
[core/resource-type-extension.example.yml](schemas/concepts/resource-type-extension.example.yml)

## Schema Entities
The following can be used when defining schemas but are not themselves
stand alone "kinds"

### core/entity
Entities are usually defined in blocks. 
These entities define the *external* data types
for blocks - to be used in APIs or databases.
Blockware needs to know about these entities to be able to asses a number of
things including compatibility and also enables it to exchange
optimized data streams such as protobuf or similar.

**Schema:**
[core/entity.yml](schemas/types/entity.yml)

**Example:**
[core/entity.example.yml](schemas/types/entity.example.yml)

### core/entity-list
A list of core/entity. The list includes an optional source code
for the entity list. Typically written in the Blockware schema DSL 
language

**Schema:**
[core/entity-list.yml](schemas/types/entity-list.yml)

**Example:**
[core/entity-list.example.yml](schemas/types/entity-list.example.yml)

### core/block-resource
A block resource is usually how we define resources on blocks

**Schema:**
[core/block-resource.yml](schemas/types/block-resource.yml)

**Example:**
[core/block-resource.example.yml](schemas/types/block-resource.example.yml)

### core/block-resource-list
A list of core/block-resource

**Schema:**
[core/block-resource-list.yml](schemas/types/block-resource-list.yml)

**Example:**
[core/block-resource-list.example.yml](schemas/types/block-resource-list.example.yml)

### core/language-target-reference
Usually used in blocks to determine which language target to use.

**Schema:**
[core/language-target-reference.yml](schemas/types/language-target-reference.yml)

**Example:**
[core/language-target-reference.example.yml](schemas/types/language-target-reference.example.yml)

### core/type-metadata
Most commonly used metadata schema

**Schema:**
[core/type-metadata.yml](schemas/types/type-metadata.yml)

**Example:**
[core/type-metadata.example.yml](schemas/types/type-metadata.example.yml)

### core/type-schema
Use this to embed a JSON schema into a JSON schema

**Schema:**
[core/type-schema.yml](schemas/types/type-schema.yml)

**Example:**
[core/type-schema.example.yml](schemas/types/type-schema.example.yml)

### core/type-xref
Used to indicate cross-references to other types

**Schema:**
[core/type-xref.yml](schemas/types/type-xref.yml)

**Example:**
[core/type-xref.example.yml](schemas/types/type-xref.example.yml)

# Tests

To test the schemas simply run

```bash
npm i
npm run test
```
