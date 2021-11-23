import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as mermaid from "mermaid";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

interface CurrentGraphNodeNameRef {
  currentGraphNodeName: string;
}

const name = (value: any) => value.replaceAll("-", "-<br>");

class subTopology {
  public static pattern = /Sub-topology: ([0-9]*)/;

  private static startFormatter(subTopology: string) {
    return `subgraph Sub-Topology: ${subTopology}`;
  }

  public static endFormatter() {
    return `end`;
  };

  public static visit(line: string, subTopologies: string[], subTopologiesList: string[]): void {
    let match = line.match(this.pattern);
    // Close the previous sub-topology before opening a new one;
    if (subTopologies.length) {
      subTopologies.push(this.endFormatter());
    }
    if (match) {
      subTopologies.push(this.startFormatter(match[1]));
      subTopologiesList.push(match[1]);
    }
  }
}

class source {
  public static pattern = /Source:\s+(\S+)\s+\(topics:\s+\[(.*)\]\)/;

  private static formatter(source: string, topic: string) {
    return `${topic}[${topic}] --> ${source}(${name(source)})`;
  }

  public static visit(line: string, outside: string[], topicSourcesList: string[], ref: CurrentGraphNodeNameRef): void {
    let match = line.match(this.pattern);
    if (match) {
      ref.currentGraphNodeName = match[1].trim();
      let topics = match[2]
      topics.split(',').filter(String).map(topic => topic.trim()).forEach(topic => {
        outside.push(this.formatter(ref.currentGraphNodeName, topic));
        topicSourcesList.push(topic);
      });
    }
  }
};

class processor {
  public static pattern = /Processor:\s+(\S+)\s+\(stores:\s+\[(.*)\]\)/;

  private static formatter(processor: string, store: string): string {
    return (processor.includes("JOIN")) ? `${store}[(${name(store)})] --> ${processor}(${name(processor)})` : `${processor}(${name(processor)}) --> ${store}[(${name(store)})]`;
  }

  public static visit(line: string, ref: CurrentGraphNodeNameRef, outside: string[], stateStoresList: string[]): void {
    let match = line.match(this.pattern);
    if (match) {

      ref.currentGraphNodeName = match[1].trim();
      let stores = match[2];
      stores.split(',').filter(String).map(store => store.trim()).forEach(store => {
        outside.push(this.formatter(ref.currentGraphNodeName, store));
        stateStoresList.push(store);
      });
    }
  }
}

class sink {
  public static pattern = /Sink:\s+(\S+)\s+\(topic:\s+(.*)\)/;

  private static formatter(sink: string, topic: string) {
    return `${sink}(${name(sink)}) --> ${topic}[${topic}]`;
  }

  public static visit(line: string, ref: CurrentGraphNodeNameRef, outside: string[], topicSinksList: string[]): void {
    let match = line.match(this.pattern);
    if (match) {
      ref.currentGraphNodeName = match[1].trim();
      let topic = match[2].trim();
      outside.push(this.formatter(ref.currentGraphNodeName, topic));
      topicSinksList.push(topic);
    }
  }
}

class rightArrow {
  public static pattern = /\s*-->\s+(.*)/;

  private static formatter(src: string, dst: string) {
    return `${src}(${name(src)}) --> ${dst}(${name(dst)})`;
  }

  public static visit(line: string, ref: CurrentGraphNodeNameRef, subTopologies: string[]): void {
    let match = line.match(this.pattern);
    if (match) {
      match[1].split(',').filter(String).map(target => target.trim()).filter(target => target !== "none").forEach(target => {
        subTopologies.push(this.formatter(ref.currentGraphNodeName, target))
      });
    }
  }
}

@Component({
  selector: 'app-kafka-stream-graph',
  templateUrl: './kafka-stream-graph.component.html',
  styleUrls: ['./kafka-stream-graph.component.scss']
})
export class KafkaStreamGraphComponent implements OnInit, AfterViewInit {

  public svgContent: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    mermaid.default.initialize({
      theme: "forest",
      startOnLoad: false
    });

    this.initGraph();
  }


  private toMermaid(topology: string): any {
    let lines = topology.split('\n');
    let subTopologies: string[] = [];
    let outside: string[] = [];
    let currentGraphNodeName: CurrentGraphNodeNameRef = {currentGraphNodeName: ''};
    let subTopologiesList: string[] = [];
    let topicSourcesList: string[] = [];
    let topicSinksList: string[] = [];
    let stateStoresList: string[] = [];


    for (const line of lines) {
      switch (true) {
        case subTopology.pattern.test(line):
          subTopology.visit(line, subTopologies, subTopologiesList);
          break;
        case source.pattern.test(line):
          source.visit(line, outside, topicSourcesList, currentGraphNodeName);
          break;
        case processor.pattern.test(line):
          processor.visit(line, currentGraphNodeName, outside, stateStoresList);
          break;
        case sink.pattern.test(line):
          sink.visit(line, currentGraphNodeName, outside, topicSinksList);
          break;
        case rightArrow.pattern.test(line):
          rightArrow.visit(line, currentGraphNodeName, subTopologies);
          break;
        default:
          break;
      }

    }

    if (subTopologies.length) {
      subTopologies.push(subTopology.endFormatter());
    }

    let description = ["graph TD"].concat(outside).concat(subTopologies).concat(topicSourcesList).concat(topicSinksList).concat(stateStoresList).join('\n');

    return {
      description: description,
      details: {
        subTopologies: subTopologiesList,
        topicSources: topicSourcesList,
        topicSinks: topicSinksList,
        stateStores: stateStoresList
      }
    };
  }


  private initGraph(): void {
    const topologyDescription = `Topology
Sub-topologies:
Sub-topology: 0
\tSource:  KSTREAM-SOURCE-0000000000 (topics: [conversation-meta])
\t--> KSTREAM-TRANSFORM-0000000001
\tProcessor: KSTREAM-TRANSFORM-0000000001 (stores: [conversation-meta-state])
\t--> KSTREAM-KEY-SELECT-0000000002
\t<-- KSTREAM-SOURCE-0000000000
\tProcessor: KSTREAM-KEY-SELECT-0000000002 (stores: [])
\t--> KSTREAM-FILTER-0000000005
\t<-- KSTREAM-TRANSFORM-0000000001
\tProcessor: KSTREAM-FILTER-0000000005 (stores: [])
\t--> KSTREAM-SINK-0000000004
\t<-- KSTREAM-KEY-SELECT-0000000002
\tSink: KSTREAM-SINK-0000000004 (topic: count-resolved-repartition)
\t<-- KSTREAM-FILTER-0000000005
Sub-topology: 1
\tSource: KSTREAM-SOURCE-0000000006 (topics: [count-resolved-repartition])
\t--> KSTREAM-AGGREGATE-0000000003
\tProcessor: KSTREAM-AGGREGATE-0000000003 (stores: [count-resolved])
\t--> KTABLE-TOSTREAM-0000000007
\t<-- KSTREAM-SOURCE-0000000006
\tProcessor: KTABLE-TOSTREAM-0000000007 (stores: [])
\t--> KSTREAM-SINK-0000000008
\t<-- KSTREAM-AGGREGATE-0000000003
\tSink: KSTREAM-SINK-0000000008 (topic: streams-count-resolved)
\t<-- KTABLE-TOSTREAM-0000000007
\t\t\t`;

    let mermaidGraphDefinition = this.toMermaid(topologyDescription);
    console.log(mermaidGraphDefinition.description);

    mermaid.default.mermaidAPI.render("mermaid-graph-" + Date.now(), mermaidGraphDefinition.description, (svgCode: string) => {

      console.log(svgCode);
      setTimeout(() => {
        this.svgContent = svgCode;
        this.svgContent =  this.sanitizer.bypassSecurityTrustHtml(svgCode);
      });
    });

    // $('#sub-topologies-details').html(mermaidGraphDefinition.details.subTopologies.length);
    // $('#topic-sources-details').text(mermaidGraphDefinition.details.topicSources.length);
    // $('#topic-sinks-details').text(mermaidGraphDefinition.details.topicSinks.length);
    // $('#state-stores-details').text(mermaidGraphDefinition.details.stateStores.length);
    //
    // mermaidGraphDefinition.details.topicSources.sort().forEach(topic => {
    //   $('#topic-sources-list').append(`<li><span class="badge badge-pill badge-primary">$\{topic}</span></li>`)
    // });
    //
    // mermaidGraphDefinition.details.topicSinks.sort().forEach(topic => {
    //   $('#topic-sinks-list').append(`<li><span class="badge badge-pill badge-primary">$\{topic}</span></li>`)
    // });
    //
    // mermaidGraphDefinition.details.stateStores.sort().forEach(store => {
    //   $('#state-stores-list').append(`<li><span class="badge badge-pill badge-primary">$\{store}</span></li>`)
    // });

  };


}
