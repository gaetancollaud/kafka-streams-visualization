import {Component, OnDestroy, OnInit} from '@angular/core';

import * as mermaid from 'mermaid';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AsciiToMermaid} from '../utils/ascii-to-mermaid';
import {Store} from '../store.service';
import {debounceTime, ReplaySubject, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-kafka-stream-graph',
  templateUrl: './kafka-stream-graph.component.html',
  styleUrls: ['./kafka-stream-graph.component.scss']
})
export class KafkaStreamGraphComponent implements OnInit, OnDestroy {

  public svgContent: SafeHtml | undefined;
  private destroySubject: Subject<any> = new ReplaySubject();

  constructor(private sanitizer: DomSanitizer, private store: Store) {
  }

  ngOnInit(): void {
    mermaid.default.initialize({
      theme: 'forest',
      startOnLoad: false
    });

    this.store.getTopology()
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300)
      )
      .subscribe(topology => {
        if (topology) {
          const mermaidGraphDefinition: string = AsciiToMermaid.toMermaid(topology);

          mermaid.default.mermaidAPI.render('mermaid-graph-' + Date.now(), mermaidGraphDefinition, (svgCode: string) => {
            setTimeout(() => {
              this.svgContent = svgCode;
              this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgCode);
            });
          });
        } else {
          this.svgContent = undefined;
        }
      });

  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }


}
