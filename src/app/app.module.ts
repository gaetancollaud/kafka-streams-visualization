import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {AsciiInputComponent} from './ascii-input/ascii-input.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {GraphRenderSvgComponent} from './graph-render-svg/graph-render-svg.component';
import {GraphRenderCanvasComponent} from './graph-render-canvas/graph-render-canvas.component';
import { ForkMeComponent } from './fork-me/fork-me.component';

@NgModule({
  declarations: [
    AppComponent,
    AsciiInputComponent,
    GraphRenderSvgComponent,
    GraphRenderCanvasComponent,
    ForkMeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
