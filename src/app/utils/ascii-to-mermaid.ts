interface CurrentGraphNodeNameRef {
  currentGraphNodeName: string;
}

const nameFunction = (value: any) => value.replaceAll('-', '-<br>');

class SubTopology {
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

class Source {
  public static pattern = /Source:\s+(\S+)\s+\(topics:\s+\[(.*)\]\)/;

  private static formatter(source: string, topic: string) {
    return `${topic}[${topic}] --> ${source}(${nameFunction(source)})`;
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
}

class Processor {
  public static pattern = /Processor:\s+(\S+)\s+\(stores:\s+\[(.*)\]\)/;

  private static formatter(processor: string, store: string): string {
    return (processor.includes('JOIN')) ? `${store}[(${nameFunction(store)})] --> ${processor}(${nameFunction(processor)})` : `${processor}(${nameFunction(processor)}) --> ${store}[(${nameFunction(store)})]`;
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

class Sink {
  public static pattern = /Sink:\s+(\S+)\s+\(topic:\s+(.*)\)/;

  private static formatter(sink: string, topic: string) {
    return `${sink}(${nameFunction(sink)}) --> ${topic}[${topic}]`;
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

class RightArrow {
  public static pattern = /\s*-->\s+(.*)/;

  private static formatter(src: string, dst: string) {
    return `${src}(${nameFunction(src)}) --> ${dst}(${nameFunction(dst)})`;
  }

  public static visit(line: string, ref: CurrentGraphNodeNameRef, subTopologies: string[]): void {
    let match = line.match(this.pattern);
    if (match) {
      match[1].split(',').filter(String).map(target => target.trim()).filter(target => target !== 'none').forEach(target => {
        subTopologies.push(this.formatter(ref.currentGraphNodeName, target))
      });
    }
  }
}


export class AsciiToMermaid {

  public static toMermaid(topology: string): string {
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
        case SubTopology.pattern.test(line):
          SubTopology.visit(line, subTopologies, subTopologiesList);
          break;
        case Source.pattern.test(line):
          Source.visit(line, outside, topicSourcesList, currentGraphNodeName);
          break;
        case Processor.pattern.test(line):
          Processor.visit(line, currentGraphNodeName, outside, stateStoresList);
          break;
        case Sink.pattern.test(line):
          Sink.visit(line, currentGraphNodeName, outside, topicSinksList);
          break;
        case RightArrow.pattern.test(line):
          RightArrow.visit(line, currentGraphNodeName, subTopologies);
          break;
        default:
          break;
      }

    }

    if (subTopologies.length) {
      subTopologies.push(SubTopology.endFormatter());
    }

    return ['graph TD'].concat(outside).concat(subTopologies).concat(topicSourcesList).concat(topicSinksList).concat(stateStoresList).join('\n');
  }

}
