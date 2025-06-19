import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import * as mermaid from 'mermaid';
import {Store} from './store.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import mermaidAPI from "mermaid/mermaidAPI";
import Theme = mermaidAPI.Theme;
import {ForkMeComponent} from "./fork-me/fork-me.component";
import {MatToolbar} from "@angular/material/toolbar";
import {AsciiInputComponent} from "./ascii-input/ascii-input.component";
import {GraphRenderSvgComponent} from "./graph-render-svg/graph-render-svg.component";
import {GraphRenderCanvasComponent} from "./graph-render-canvas/graph-render-canvas.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    ForkMeComponent,
    MatToolbar,
    MatTabGroup,
    MatTab,
    AsciiInputComponent,
    GraphRenderSvgComponent,
    GraphRenderCanvasComponent
  ]
})
export class AppComponent implements OnInit {

  @ViewChild('tabGroup')
  public tabGroup: MatTabGroup | undefined;

  store = inject(Store);

  constructor() {
    effect(() => {
      const svg = this.store.topologySvg();
      if (svg && this.tabGroup) {
        // as soon as a svg is rendered, switch to the svg tab
        this.tabGroup.selectedIndex = 1;
      }
    });
  }

  ngOnInit(): void {
    mermaid.default.initialize({
      theme: 'default' as Theme,
      startOnLoad: false
    });
  }
}
