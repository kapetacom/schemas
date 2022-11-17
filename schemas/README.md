# Core schemas
Contains the schemas for all core blockware types.

## core/block-type
Defines a block type. This typically is some sort of fundamental role
a block can take - such as frontend / backend / desktop / embedded.

## core/block-type-group
A special block type that allows the user to embed multiple connected
blocks into a plan

## core/plan
Contains blocks and connections between blocks. This is effectively a blue
print of a software system.

## core/deployment-target
Defines a new target where users can deploy their plans. 

## core/language-target
Defines a new language target in which a block can be created. 
This typically means a specific programming language and framework
in that language - such as C#.NET or Java Spring Boot

## core/resource-type-internal
Defines internal resources. Internal resources are resources that 
one block can provide to another. The name internal refers
to it being internal communication within your plan.
Typical examples of this would be a REST API being provided by one block
and consumed by a REST Client in another.  

## core/resource-type-operator
Defines operator resources. An operator resource is something that
can only be consumed by blocks - and is typically an external piece of
software or hardware - such as a database or a disk.

## core/resource-type-extension
Extension resources defines the interface of a resource - but doesn't
itself provide the implementation. These are meant to standardise
certain operations and a good example could be a credit card payment 
extension. The extension will then define the API by which to communicate
with a generic payment provider. Other blocks can then provide the same
extension type by implementing that exact interface.
The reason for this is to be able to provide standard integrations
to similar types of services - so they can be easily exchanged for others
and when designing a block - you dont have to tie in to a specific provider.

## core/entity
Entities are - unlike the rest - not a standalone type and is usually
defined in blocks. These entities define the *external* data types
for blocks - to be used in APIs or databases.
Blockware needs to know about these entities to be able to asses a number of 
things including compatibility and also enables it to exchange 
optimized data streams such as protobuf or similar.



