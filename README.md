# Kafka streams visualization

This small application allows you to simply create a graph image from a Kafka Streams Ascii topology.

It was heavily inspired by
 - https://github.com/zz85/kafka-streams-viz
 - Work from [danielpetisme](https://github.com/danielpetisme) on Quarkus [dev module for Kafka Streams](https://github.com/quarkusio/quarkus/blob/main/extensions/kafka-streams/deployment/src/main/resources/dev-templates/kafka-streams-topology.html)

I wanted to have something more clean that the rough images of zz85/kafka-streams-viz and I also wanted to have a standalone application as not everyone is using
Quarkus

## [Live version](https://gaetancollaud.github.io/kafka-streams-visualization/)

This app is deployed using github pages: https://gaetancollaud.github.io/kafka-streams-visualization/

## How to use

Simply use [Toplogy.describe()](https://kafka.apache.org/23/javadoc/org/apache/kafka/streams/Topology.html#describe--)
from Kafka Streams to get the Topology in Ascii format and put the output in the form

```java
Topology myTopology = new StreamsBuilder()
  // yourTopologyHere()
  .build();
System.out.println(myTopology.describe()); // put this output in the form
```

## Docker Usage

### Building the Docker Image

To build the Docker image, run the following command from the project root:

```bash
docker build -t kafka-streams-visualization .
```

### Running the Container

To run the application in Docker:

```bash
docker run -p 8080:80 kafka-streams-visualization
```

The application will be available at `http://localhost:8080`

## Features

 - [x] Render to SVG
 - [x] Render to Canvas (to allow copy/paste of the image)
 - [x] Topology stored in the URL (for easy exchange)
 - [ ] Download images

# Under the hood
 - [Mermaid.js](https://mermaid-js.github.io/mermaid/#/)
 - [Angular](https://angular.io/)
 - [Angular Material](https://material.angular.io/)
