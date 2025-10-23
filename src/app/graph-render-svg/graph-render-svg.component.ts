import {Component, computed, inject, input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-graph-render-svg',
  templateUrl: './graph-render-svg.component.html',
  styleUrls: ['./graph-render-svg.component.scss'],
  imports: []
})
export class GraphRenderSvgComponent {

  private sanitizer = inject(DomSanitizer);

  topologySvg = input.required<string | null>();

  svgContent = computed(() => {
    let svg = this.topologySvg();
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : undefined;
  });


}
