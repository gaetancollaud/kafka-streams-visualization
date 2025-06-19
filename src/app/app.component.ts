import {Component, OnInit, ViewChild} from '@angular/core';
import * as mermaid from 'mermaid';
import {Store} from './store.service';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  @ViewChild('tabGroup')
  public tabGroup: MatTabGroup | undefined;

  public constructor(private store: Store) {
  }

  ngOnInit(): void {
    mermaid.default.initialize({
      theme: 'default',
      startOnLoad: false
    });
    this.store.getTopologySvg().subscribe(svg => {
      if (svg && this.tabGroup) {
        // as soon as an svg is rendered, switch to the svg tab
        this.tabGroup.selectedIndex = 1;
      }
    });
  }
}
