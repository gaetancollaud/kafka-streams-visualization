import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

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
export class KafkaStreamGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  public svgContent: SafeHtml | undefined;
  private destroySubject: Subject<any> = new ReplaySubject();

  @ViewChild('canvas')
  private canvas: ElementRef | undefined;

  constructor(private sanitizer: DomSanitizer, private store: Store) {
  }

  ngOnInit(): void {
    mermaid.default.initialize({
      theme: 'default',
      // themeCSS: '.label foreignObject { overflow: visible; }',
      startOnLoad: false
    });


  }

  ngAfterViewInit(): void {

    this.store.getTopology()
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300)
      )
      .subscribe(topology => {
        if (topology) {
          const mermaidGraphDefinition: string = AsciiToMermaid.toMermaid(topology);

          mermaid.default.mermaidAPI.render('mermaid-graph-' + Date.now(), mermaidGraphDefinition, (svgCode: string) => {

            this.printSvgToCanvas(svgCode);

            this.svgContent = svgCode;
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgCode);
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

  printSvgToCanvas(svgText: string): void {
    try {
      // can use the domUrl function from the browser
      let domUrl = window.URL || window.webkitURL || window;
      if (!domUrl) {
        throw new Error('(browser doesnt support this)')
      }

      // create a canvas element to pass through
      let canvas = this.canvas?.nativeElement as HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      // make a blob from the svg
      let svg = new Blob([svgText], {
        type: 'image/svg+xml;charset=utf-8'
      });

      // create a dom object for that image
      let url = domUrl.createObjectURL(svg);

      // create a new image to hold it the converted type
      let img = new Image();

      // when the image is loaded we can get it as base64 url
      img.onload = () => {
        // draw it to the canvas
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        // we don't need the original any more
        domUrl.revokeObjectURL(url);
        // now we can resolve the promise, passing the base64 url
        console.log('url', canvas.toDataURL());
      };

      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (err) {
      console.error('Failed to generate canvas')
    }
  };

}
