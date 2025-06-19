import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ReplaySubject, Subject, takeUntil} from 'rxjs';
import {Store} from '../store.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-graph-render-svg',
    templateUrl: './graph-render-svg.component.html',
    styleUrls: ['./graph-render-svg.component.scss'],
    imports: [NgIf]
})
export class GraphRenderSvgComponent implements OnInit, OnDestroy {

  public svgContent: SafeHtml | undefined;
  private destroySubject: Subject<any> = new ReplaySubject();

  constructor(private sanitizer: DomSanitizer, private store: Store) {
  }

  ngOnInit(): void {
    this.store.getTopologySvg()
      .pipe(
        takeUntil(this.destroySubject),
      )
      .subscribe(topologySvg => {
        this.svgContent = topologySvg ? this.sanitizer.bypassSecurityTrustHtml(topologySvg) : undefined;
      });
  }


  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }


}
