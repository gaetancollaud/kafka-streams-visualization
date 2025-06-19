import {effect, Injectable, signal} from '@angular/core';
import * as mermaid from 'mermaid';
import {AsciiToMermaid} from './utils/ascii-to-mermaid';

@Injectable({
  providedIn: 'root'
})
export class Store {
  public readonly topology = signal<string | null>(null);
  public readonly topologySvg = signal<string | null>(null);

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

    effect(() => {
      // TODO debounce 300ms
      const top = this.topology();
      if (!top) {
        this.topologySvg.set(null);
      } else {
        const mermaidGraphDefinition: string = AsciiToMermaid.toMermaid(top);
        mermaid.default.mermaidAPI.render('mermaid-graph-' + Date.now(), mermaidGraphDefinition, (svgCode: string) => {
          this.topologySvg.set(svgCode);
        });
      }
    });
  }

  public clearTopology() {
    this.topology.set(null);
    window.location.hash = '';
  }

  public setTopology(topology: string) {
    if (topology != this.topology()) {
      this.topology.set(topology);
      window.location.hash = btoa(topology);
    }
  }

}
