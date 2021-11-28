import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, Observable} from 'rxjs';
import * as mermaid from 'mermaid';
import {AsciiToMermaid} from './utils/ascii-to-mermaid';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private topology: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private topologySvg: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public constructor() {
    let hash = window.location.hash;
    if (hash) {
      if (hash.startsWith('#')) {
        hash = hash.substr(1);
      }
      try {
        let topology = atob(hash);
        this.setTopology(topology);
      } catch (e) {
        console.error('Unable to read topology from url', hash, e);
      }
    }

    this.getTopology()
      .pipe(
        debounceTime(300)
      ).subscribe((top: string | null) => {
      if (top) {
        const mermaidGraphDefinition: string = AsciiToMermaid.toMermaid(top);
        mermaid.default.mermaidAPI.render('mermaid-graph-' + Date.now(), mermaidGraphDefinition, (svgCode: string) => {
          this.topologySvg.next(svgCode);
        });
      } else {
        this.topologySvg.next(null);
      }

    })
  }

  public clearTopology() {
    this.topology.next(null);
    window.location.hash = '';
  }

  public setTopology(topology: string) {
    if (topology != this.topology.getValue()) {
      this.topology.next(topology);
      window.location.hash = btoa(topology);
    }
  }

  public getTopology(): Observable<string | null> {
    return this.topology;
  }

  public getTopologySvg(): Observable<string | null> {
    return this.topologySvg;
  }

}
