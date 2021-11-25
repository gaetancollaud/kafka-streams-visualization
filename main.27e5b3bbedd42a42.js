"use strict";(self.webpackChunkkafka_streams_visualization=self.webpackChunkkafka_streams_visualization||[]).push([[179],{346:(A,h,S)=>{var R=S(427),r=S(551),C=S(499);let g=(()=>{class o{constructor(){this.topology=new C.X(null);let t=window.location.hash;if(t){t.startsWith("#")&&(t=t.substr(1));try{let e=atob(t);this.topology.next(e)}catch(e){console.error("Unable to read topology from url",t,e)}}}clearTopology(){this.topology.next(null),window.location.hash=""}setTopology(t){this.topology.next(t)}getTopology(){return this.topology}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var I=S(19),M=S(860),K=S(485);const l=o=>o.replaceAll("-","-<br>");let u=(()=>{class o{static startFormatter(t){return`subgraph Sub-Topology: ${t}`}static endFormatter(){return"end"}static visit(t,e,s){let n=t.match(this.pattern);e.length&&e.push(this.endFormatter()),n&&(e.push(this.startFormatter(n[1])),s.push(n[1]))}}return o.pattern=/Sub-topology: ([0-9]*)/,o})(),m=(()=>{class o{static formatter(t,e){return`${e}[${e}] --\x3e ${t}(${l(t)})`}static visit(t,e,s,n){let a=t.match(this.pattern);a&&(n.currentGraphNodeName=a[1].trim(),a[2].split(",").filter(String).map(c=>c.trim()).forEach(c=>{e.push(this.formatter(n.currentGraphNodeName,c)),s.push(c)}))}}return o.pattern=/Source:\s+(\S+)\s+\(topics:\s+\[(.*)\]\)/,o})(),f=(()=>{class o{static formatter(t,e){return t.includes("JOIN")?`${e}[(${l(e)})] --\x3e ${t}(${l(t)})`:`${t}(${l(t)}) --\x3e ${e}[(${l(e)})]`}static visit(t,e,s,n){let a=t.match(this.pattern);a&&(e.currentGraphNodeName=a[1].trim(),a[2].split(",").filter(String).map(c=>c.trim()).forEach(c=>{s.push(this.formatter(e.currentGraphNodeName,c)),n.push(c)}))}}return o.pattern=/Processor:\s+(\S+)\s+\(stores:\s+\[(.*)\]\)/,o})(),d=(()=>{class o{static formatter(t,e){return`${t}(${l(t)}) --\x3e ${e}[${e}]`}static visit(t,e,s,n){let a=t.match(this.pattern);if(a){e.currentGraphNodeName=a[1].trim();let E=a[2].trim();s.push(this.formatter(e.currentGraphNodeName,E)),n.push(E)}}}return o.pattern=/Sink:\s+(\S+)\s+\(topic:\s+(.*)\)/,o})(),O=(()=>{class o{static formatter(t,e){return`${t}(${l(t)}) --\x3e ${e}(${l(e)})`}static visit(t,e,s){let n=t.match(this.pattern);n&&n[1].split(",").filter(String).map(a=>a.trim()).filter(a=>"none"!==a).forEach(a=>{s.push(this.formatter(e.currentGraphNodeName,a))})}}return o.pattern=/\s*-->\s+(.*)/,o})();var P=S(559),v=S(263),y=S(712);const N=["canvas"];let L=(()=>{class o{constructor(t,e){this.sanitizer=t,this.store=e,this.destroySubject=new P.t}ngOnInit(){K.Z.initialize({theme:"default",startOnLoad:!1})}ngAfterViewInit(){this.store.getTopology().pipe((0,v.R)(this.destroySubject),(0,y.b)(300)).subscribe(t=>{if(t){const e=class{static toMermaid(i){let t=i.split("\n"),e=[],s=[],n={currentGraphNodeName:""},a=[],E=[],c=[],T=[];for(const p of t)switch(!0){case u.pattern.test(p):u.visit(p,e,a);break;case m.pattern.test(p):m.visit(p,s,E,n);break;case f.pattern.test(p):f.visit(p,n,s,T);break;case d.pattern.test(p):d.visit(p,n,s,c);break;case O.pattern.test(p):O.visit(p,n,e)}return e.length&&e.push(u.endFormatter()),["graph TD"].concat(s).concat(e).concat(E).concat(c).concat(T).join("\n")}}.toMermaid(t);K.Z.mermaidAPI.render("mermaid-graph-"+Date.now(),e,s=>{this.printSvgToCanvas(s),this.svgContent=s,this.svgContent=this.sanitizer.bypassSecurityTrustHtml(s)})}else this.svgContent=void 0})}ngOnDestroy(){this.destroySubject.next(null),this.destroySubject.complete()}printSvgToCanvas(t){var e;try{let s=window.URL||window.webkitURL||window;if(!s)throw new Error("(browser doesnt support this)");let n=null===(e=this.canvas)||void 0===e?void 0:e.nativeElement,a=n.getContext("2d"),E=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),c=s.createObjectURL(E),T=new Image;T.onload=()=>{n.width=T.width,n.height=T.height,a&&a.drawImage(T,0,0),s.revokeObjectURL(c),console.log("url",n.toDataURL())},T.crossOrigin="Anonymous",T.src=c}catch(s){console.error("Failed to generate canvas")}}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(R.H7),r.Y36(g))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-kafka-stream-graph"]],viewQuery:function(t,e){if(1&t&&r.Gf(N,5),2&t){let s;r.iGM(s=r.CRH())&&(e.canvas=s.first)}},decls:2,vars:0,consts:[["canvas",""]],template:function(t,e){1&t&&r._UZ(0,"canvas",null,0)},styles:['[_nghost-%COMP%]{display:flex;flex-direction:row}svg[_ngcontent-%COMP%]{resize:none;font-family:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}div[_ngcontent-%COMP%]{text-align:center}canvas[_ngcontent-%COMP%]{margin:auto}']}),o})();function x(o,i){if(1&o){const t=r.EpF();r.TgZ(0,"textarea",5),r.NdJ("ngModelChange",function(s){return r.CHM(t),r.oxw().textAreaValue=s})("keyup",function(){return r.CHM(t),r.oxw().textAreaChanged()}),r.qZA()}if(2&o){const t=r.oxw();r.Q6J("ngModel",t.textAreaValue)}}function _(o,i){1&o&&r._UZ(0,"app-kafka-stream-graph")}let b=(()=>{class o{constructor(t){this.store=t,this.topologyDefined=!1,this.textAreaValue=""}ngOnInit(){this.store.getTopology().subscribe(t=>this.topologyDefined=!!t)}onReset(){this.store.clearTopology()}onExample1(){this.store.setTopology("Topology\nSub-topologies:\nSub-topology: 0\n\tSource:  KSTREAM-SOURCE-0000000000 (topics: [conversation-meta])\n\t--\x3e KSTREAM-TRANSFORM-0000000001\n\tProcessor: KSTREAM-TRANSFORM-0000000001 (stores: [conversation-meta-state])\n\t--\x3e KSTREAM-KEY-SELECT-0000000002\n\t<-- KSTREAM-SOURCE-0000000000\n\tProcessor: KSTREAM-KEY-SELECT-0000000002 (stores: [])\n\t--\x3e KSTREAM-FILTER-0000000005\n\t<-- KSTREAM-TRANSFORM-0000000001\n\tProcessor: KSTREAM-FILTER-0000000005 (stores: [])\n\t--\x3e KSTREAM-SINK-0000000004\n\t<-- KSTREAM-KEY-SELECT-0000000002\n\tSink: KSTREAM-SINK-0000000004 (topic: count-resolved-repartition)\n\t<-- KSTREAM-FILTER-0000000005\nSub-topology: 1\n\tSource: KSTREAM-SOURCE-0000000006 (topics: [count-resolved-repartition])\n\t--\x3e KSTREAM-AGGREGATE-0000000003\n\tProcessor: KSTREAM-AGGREGATE-0000000003 (stores: [count-resolved])\n\t--\x3e KTABLE-TOSTREAM-0000000007\n\t<-- KSTREAM-SOURCE-0000000006\n\tProcessor: KTABLE-TOSTREAM-0000000007 (stores: [])\n\t--\x3e KSTREAM-SINK-0000000008\n\t<-- KSTREAM-AGGREGATE-0000000003\n\tSink: KSTREAM-SINK-0000000008 (topic: streams-count-resolved)\n\t<-- KTABLE-TOSTREAM-0000000007\n\t\t\t")}onExample2(){this.store.setTopology("Sub-topologies:\n Sub-topology: 0\n   Source: KSTREAM-SOURCE-0000000000 (topics: [kongo-rfid-8])\n     --\x3e KSTREAM-FILTER-0000000010, KSTREAM-FILTER-0000000012\n   Processor: KSTREAM-FILTER-0000000010 (stores: [])\n     --\x3e KSTREAM-MAP-0000000011\n     <-- KSTREAM-SOURCE-0000000000\n   Processor: KSTREAM-FILTER-0000000012 (stores: [])\n     --\x3e KSTREAM-MAP-0000000013\n     <-- KSTREAM-SOURCE-0000000000\n   Processor: KSTREAM-MAP-0000000011 (stores: [])\n     --\x3e KSTREAM-FILTER-0000000015\n     <-- KSTREAM-FILTER-0000000010\n   Processor: KSTREAM-MAP-0000000013 (stores: [])\n     --\x3e KSTREAM-FILTER-0000000028\n     <-- KSTREAM-FILTER-0000000012\n   Processor: KSTREAM-FILTER-0000000015 (stores: [])\n     --\x3e KSTREAM-SINK-0000000014\n     <-- KSTREAM-MAP-0000000011\n   Processor: KSTREAM-FILTER-0000000028 (stores: [])\n     --\x3e KSTREAM-SINK-0000000027\n     <-- KSTREAM-MAP-0000000013\n   Sink: KSTREAM-SINK-0000000014 (topic: KSTREAM-MAP-0000000011-repartition)\n     <-- KSTREAM-FILTER-0000000015\n   Sink: KSTREAM-SINK-0000000027 (topic: KSTREAM-MAP-0000000013-repartition)\n     <-- KSTREAM-FILTER-0000000028\n Sub-topology: 1\n   Source: KSTREAM-SOURCE-0000000016 (topics: [KSTREAM-MAP-0000000011-repartition])\n     --\x3e KSTREAM-JOIN-0000000017\n   Source: KSTREAM-SOURCE-0000000029 (topics: [KSTREAM-MAP-0000000013-repartition])\n     --\x3e KSTREAM-JOIN-0000000030\n   Processor: KSTREAM-JOIN-0000000017 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])\n     --\x3e KSTREAM-MAP-0000000018\n     <-- KSTREAM-SOURCE-0000000016\n   Processor: KSTREAM-JOIN-0000000030 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])\n     --\x3e KSTREAM-MAP-0000000031\n     <-- KSTREAM-SOURCE-0000000029\n   Processor: KSTREAM-MAP-0000000018 (stores: [])\n     --\x3e KSTREAM-FILTER-0000000020\n     <-- KSTREAM-JOIN-0000000017\n   Processor: KSTREAM-MAP-0000000031 (stores: [])\n     --\x3e KSTREAM-FILTER-0000000033\n     <-- KSTREAM-JOIN-0000000030\n   Processor: KSTREAM-FILTER-0000000020 (stores: [])\n     --\x3e KSTREAM-SINK-0000000019\n     <-- KSTREAM-MAP-0000000018\n   Processor: KSTREAM-FILTER-0000000033 (stores: [])\n     --\x3e KSTREAM-SINK-0000000032\n     <-- KSTREAM-MAP-0000000031\n   Source: KSTREAM-SOURCE-0000000002 (topics: [kongo-goods-weight-8])\n     --\x3e KTABLE-SOURCE-0000000003\n   Sink: KSTREAM-SINK-0000000019 (topic: KSTREAM-MAP-0000000018-repartition)\n     <-- KSTREAM-FILTER-0000000020\n   Sink: KSTREAM-SINK-0000000032 (topic: KSTREAM-MAP-0000000031-repartition)\n     <-- KSTREAM-FILTER-0000000033\n   Processor: KTABLE-SOURCE-0000000003 (stores: [kongo-goods-weight-8STATE-STORE-0000000001])\n     --\x3e none\n     <-- KSTREAM-SOURCE-0000000002\n Sub-topology: 2\n   Source: KSTREAM-SOURCE-0000000021 (topics: [KSTREAM-MAP-0000000018-repartition])\n     --\x3e KSTREAM-LEFTJOIN-0000000022\n   Processor: KSTREAM-LEFTJOIN-0000000022 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])\n     --\x3e KSTREAM-JOIN-0000000024, KSTREAM-SINK-0000000023\n     <-- KSTREAM-SOURCE-0000000021\n   Processor: KSTREAM-JOIN-0000000024 (stores: [kongo-trucks-maxweight-8STATE-STORE-0000000004])\n     --\x3e KSTREAM-FILTER-0000000025\n     <-- KSTREAM-LEFTJOIN-0000000022\n   Source: KSTREAM-SOURCE-0000000034 (topics: [KSTREAM-MAP-0000000031-repartition])\n     --\x3e KSTREAM-LEFTJOIN-0000000035\n   Processor: KSTREAM-FILTER-0000000025 (stores: [])\n     --\x3e KSTREAM-SINK-0000000026\n     <-- KSTREAM-JOIN-0000000024\n   Processor: KSTREAM-LEFTJOIN-0000000035 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])\n     --\x3e KSTREAM-SINK-0000000036\n     <-- KSTREAM-SOURCE-0000000034\n   Source: KSTREAM-SOURCE-0000000005 (topics: [kongo-trucks-maxweight-8])\n     --\x3e KTABLE-SOURCE-0000000006\n   Source: KSTREAM-SOURCE-0000000008 (topics: [kongo-trucks-weight-8])\n     --\x3e KTABLE-SOURCE-0000000009\n   Sink: KSTREAM-SINK-0000000023 (topic: kongo-trucks-weight-8)\n     <-- KSTREAM-LEFTJOIN-0000000022\n   Sink: KSTREAM-SINK-0000000026 (topic: kongo-overload-warnings)\n     <-- KSTREAM-FILTER-0000000025\n   Sink: KSTREAM-SINK-0000000036 (topic: kongo-trucks-weight-8)\n     <-- KSTREAM-LEFTJOIN-0000000035\n   Processor: KTABLE-SOURCE-0000000006 (stores: [kongo-trucks-maxweight-8STATE-STORE-0000000004])\n     --\x3e none\n     <-- KSTREAM-SOURCE-0000000005\n   Processor: KTABLE-SOURCE-0000000009 (stores: [kongo-trucks-weight-8STATE-STORE-0000000007])\n     --\x3e none\n     <-- KSTREAM-SOURCE-0000000008")}textAreaChanged(){this.textAreaValue.trim()&&(this.store.setTopology(this.textAreaValue),this.textAreaValue="")}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(g))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-root"]],decls:12,vars:2,consts:[[1,"actions"],[3,"click"],[1,"content"],["placeholder","Paste your topology in the ASCII format here",3,"ngModel","ngModelChange","keyup",4,"ngIf"],[4,"ngIf"],["placeholder","Paste your topology in the ASCII format here",3,"ngModel","ngModelChange","keyup"]],template:function(t,e){1&t&&(r.TgZ(0,"h1"),r._uU(1,"Kafka stream visualization"),r.qZA(),r.TgZ(2,"div",0),r.TgZ(3,"button",1),r.NdJ("click",function(){return e.onReset()}),r._uU(4,"Reset"),r.qZA(),r.TgZ(5,"button",1),r.NdJ("click",function(){return e.onExample1()}),r._uU(6,"Example 1"),r.qZA(),r.TgZ(7,"button",1),r.NdJ("click",function(){return e.onExample2()}),r._uU(8,"Example 2"),r.qZA(),r.qZA(),r.TgZ(9,"div",2),r.YNc(10,x,1,1,"textarea",3),r.YNc(11,_,1,0,"app-kafka-stream-graph",4),r.qZA()),2&t&&(r.xp6(10),r.Q6J("ngIf",!e.topologyDefined),r.xp6(1),r.Q6J("ngIf",e.topologyDefined))},directives:[I.O5,M.Fj,M.JJ,M.On,L],styles:["[_nghost-%COMP%]{height:100%;flex:1;display:flex;flex-direction:column;align-items:stretch}[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{flex:1}"]}),o})(),U=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o,bootstrap:[b]}),o.\u0275inj=r.cJS({providers:[],imports:[[R.b2,M.u5]]}),o})();(0,r.G48)(),R.q6().bootstrapModule(U).catch(o=>console.error(o))}},A=>{A.O(0,[736],()=>A(A.s=346)),A.O()}]);