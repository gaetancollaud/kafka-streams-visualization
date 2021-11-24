import {Component, OnInit} from '@angular/core';
import {Store} from './store.service';

const TOPOLOGY_EXAMPLE_1 = `Topology
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
const TOPOLOGY_EXAMPLE_2 = `Sub-topologies:
 Sub-topology: 0
   Source: KSTREAM-SOURCE-0000000000 (topics: [kongo-rfid-8])
     --> KSTREAM-FILTER-0000000010, KSTREAM-FILTER-0000000012
   Processor: KSTREAM-FILTER-0000000010 (stores: [])
     --> KSTREAM-MAP-0000000011
     <-- KSTREAM-SOURCE-0000000000
   Processor: KSTREAM-FILTER-0000000012 (stores: [])
     --> KSTREAM-MAP-0000000013
     <-- KSTREAM-SOURCE-0000000000
   Processor: KSTREAM-MAP-0000000011 (stores: [])
     --> KSTREAM-FILTER-0000000015
     <-- KSTREAM-FILTER-0000000010
   Processor: KSTREAM-MAP-0000000013 (stores: [])
     --> KSTREAM-FILTER-0000000028
     <-- KSTREAM-FILTER-0000000012
   Processor: KSTREAM-FILTER-0000000015 (stores: [])
     --> KSTREAM-SINK-0000000014
     <-- KSTREAM-MAP-0000000011
   Processor: KSTREAM-FILTER-0000000028 (stores: [])
     --> KSTREAM-SINK-0000000027
     <-- KSTREAM-MAP-0000000013
   Sink: KSTREAM-SINK-0000000014 (topic: KSTREAM-MAP-0000000011-repartition)
     <-- KSTREAM-FILTER-0000000015
   Sink: KSTREAM-SINK-0000000027 (topic: KSTREAM-MAP-0000000013-repartition)
     <-- KSTREAM-FILTER-0000000028
 Sub-topology: 1
   Source: KSTREAM-SOURCE-0000000016 (topics: [KSTREAM-MAP-0000000011-repartition])
     --> KSTREAM-JOIN-0000000017
   Source: KSTREAM-SOURCE-0000000029 (topics: [KSTREAM-MAP-0000000013-repartition])
     --> KSTREAM-JOIN-0000000030
   Processor: KSTREAM-JOIN-0000000017 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])
     --> KSTREAM-MAP-0000000018
     <-- KSTREAM-SOURCE-0000000016
   Processor: KSTREAM-JOIN-0000000030 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])
     --> KSTREAM-MAP-0000000031
     <-- KSTREAM-SOURCE-0000000029
   Processor: KSTREAM-MAP-0000000018 (stores: [])
     --> KSTREAM-FILTER-0000000020
     <-- KSTREAM-JOIN-0000000017
   Processor: KSTREAM-MAP-0000000031 (stores: [])
     --> KSTREAM-FILTER-0000000033
     <-- KSTREAM-JOIN-0000000030
   Processor: KSTREAM-FILTER-0000000020 (stores: [])
     --> KSTREAM-SINK-0000000019
     <-- KSTREAM-MAP-0000000018
   Processor: KSTREAM-FILTER-0000000033 (stores: [])
     --> KSTREAM-SINK-0000000032
     <-- KSTREAM-MAP-0000000031
   Source: KSTREAM-SOURCE-0000000002 (topics: [kongo-goods-weight-8])
     --> KTABLE-SOURCE-0000000003
   Sink: KSTREAM-SINK-0000000019 (topic: KSTREAM-MAP-0000000018-repartition)
     <-- KSTREAM-FILTER-0000000020
   Sink: KSTREAM-SINK-0000000032 (topic: KSTREAM-MAP-0000000031-repartition)
     <-- KSTREAM-FILTER-0000000033
   Processor: KTABLE-SOURCE-0000000003 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])
     --> none
     <-- KSTREAM-SOURCE-0000000002
 Sub-topology: 2
   Source: KSTREAM-SOURCE-0000000021 (topics: [KSTREAM-MAP-0000000018-repartition])
     --> KSTREAM-LEFTJOIN-0000000022
   Processor: KSTREAM-LEFTJOIN-0000000022 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])
     --> KSTREAM-JOIN-0000000024, KSTREAM-SINK-0000000023
     <-- KSTREAM-SOURCE-0000000021
   Processor: KSTREAM-JOIN-0000000024 (stores: [kongo-trucks-maxweight-8STATE-STORE-0000000004])
     --> KSTREAM-FILTER-0000000025
     <-- KSTREAM-LEFTJOIN-0000000022
   Source: KSTREAM-SOURCE-0000000034 (topics: [KSTREAM-MAP-0000000031-repartition])
     --> KSTREAM-LEFTJOIN-0000000035
   Processor: KSTREAM-FILTER-0000000025 (stores: [])
     --> KSTREAM-SINK-0000000026
     <-- KSTREAM-JOIN-0000000024
   Processor: KSTREAM-LEFTJOIN-0000000035 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])
     --> KSTREAM-SINK-0000000036
     <-- KSTREAM-SOURCE-0000000034
   Source: KSTREAM-SOURCE-0000000005 (topics: [kongo-trucks-maxweight-8])
     --> KTABLE-SOURCE-0000000006
   Source: KSTREAM-SOURCE-0000000008 (topics: [kongo-trucks-weight-8])
     --> KTABLE-SOURCE-0000000009
   Sink: KSTREAM-SINK-0000000023 (topic: kongo-trucks-weight-8)
     <-- KSTREAM-LEFTJOIN-0000000022
   Sink: KSTREAM-SINK-0000000026 (topic: kongo-overload-warnings)
     <-- KSTREAM-FILTER-0000000025
   Sink: KSTREAM-SINK-0000000036 (topic: kongo-trucks-weight-8)
     <-- KSTREAM-LEFTJOIN-0000000035
   Processor: KTABLE-SOURCE-0000000006 (stores: [kongo-trucks-maxweight-8STATE-STORE-0000000004])
     --> none
     <-- KSTREAM-SOURCE-0000000005
   Processor: KTABLE-SOURCE-0000000009 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])
     --> none
     <-- KSTREAM-SOURCE-0000000008`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public topologyDefined: boolean = false;
  public textAreaValue: string = '';

  public constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.getTopology().subscribe(topology => this.topologyDefined = !!topology);

    // setTimeout(() => {
    //   this.store.setTopology(TOPOLOGY_EXAMPLE_1);
    // }, 10);
  }

  onReset() {
    this.store.clearTopology();
  }

  onExample1() {
    this.store.setTopology(TOPOLOGY_EXAMPLE_1);
  }

  onExample2() {
    this.store.setTopology(TOPOLOGY_EXAMPLE_2);

  }

  textAreaChanged() {
    if (this.textAreaValue.trim()) {
      this.store.setTopology(this.textAreaValue);
      this.textAreaValue = '';
    }
  }
}
