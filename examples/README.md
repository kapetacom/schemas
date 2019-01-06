# Overview

This folder contains "mock" implementations of everything 
available on the blockware platform. 

Below is an overview of the various concepts:

## Controller
Controllers are the most fundamental "kind" on blockware. All other kinds rely on a 
controller to implement them. Controllers provide **kind**- and **resource** types to
the system and handles the continued operation of the resources it introduces.

## Resource
A resource can be defined by something that can be consumed - or something that can be provided.
As an example a "Service" does not by itself provide anything - but it **might** provide a REST API.
It **might** also consume a disk mount or a database.

## Service
Services are the actual blocks of functionality - governed by the Service Controller. 
These implement things like event handling, REST API's and more.

Services are also the main providers and consumers of resources used 
throughout the blockware system.

## Extension
For blocks that need the ability to allow 3rd parties (users) to extent its capabilities 
through additional integrations or alternate behavior - blockware provides Extensions 
through the Extension Controller. An extension consists of one or more extension components - which each 
implement an "Extension Type". Extension Types are single-purpose methods and services can
consume extensions based on these types. 

As an example say you were making an authentication block - and wanted to provide a way
for users to authenticate using lots of different external authentication providers.
Instead of adding lots of SDK's and "spaghetti" to the block itself you'd define an 
extension type called "authenticator". An extension type defines a schema and interface
for a "nano-service" - effectively creating a uniform bridge between your block and 
all the external authenticator providers. You could even allow users to add more 
implementations.

The extension system can also be used to implement an "App store" that would allow users
to extend any part of your blocks with new functionality or integrations.

Best practice is to never integrate directly to a 3rd party service from a block - if 
it could possibly make sense for users to use a different service.
 
