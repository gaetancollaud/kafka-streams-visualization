import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ReplaySubject, Subject, takeUntil} from 'rxjs';
import {Store} from '../store.service';

@Component({
    selector: 'app-graph-render-canvas',
    templateUrl: './graph-render-canvas.component.html',
    styleUrls: ['./graph-render-canvas.component.scss']
})
export class GraphRenderCanvasComponent implements AfterViewInit, OnDestroy {

  private destroySubject: Subject<any> = new ReplaySubject();

  @ViewChild('canvas')
  private canvas: ElementRef | undefined;

  constructor(private sanitizer: DomSanitizer, private store: Store) {
  }

  ngAfterViewInit(): void {
    this.store.getTopologySvg()
      .pipe(
        takeUntil(this.destroySubject),
      )
      .subscribe(topologySvg => {
        if (topologySvg) {
          this.printSvgToCanvas(topologySvg);
        } else {
          this.clearCanvas();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private clearCanvas(): void {
    let canvas = this.canvas?.nativeElement as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  private printSvgToCanvas(svgText: string): void {
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

        // TODO NOT WORKING
        // // we don't need the original any more
        // domUrl.revokeObjectURL(url);
        // // now we can resolve the promise, passing the base64 url
        // console.log('url', canvas.toDataURL());
      };

      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (err) {
      console.error('Failed to generate canvas')
    }
  };

}
