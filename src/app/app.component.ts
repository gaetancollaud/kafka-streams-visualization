import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public topologyDescription = `Topology
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

}
