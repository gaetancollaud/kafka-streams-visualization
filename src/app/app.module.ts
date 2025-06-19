import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {AsciiInputComponent} from './ascii-input/ascii-input.component';
import {GraphRenderSvgComponent} from './graph-render-svg/graph-render-svg.component';
import {GraphRenderCanvasComponent} from './graph-render-canvas/graph-render-canvas.component';
import { ForkMeComponent } from './fork-me/fork-me.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [AppComponent],
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
        AsciiInputComponent,
        GraphRenderSvgComponent,
        GraphRenderCanvasComponent,
        ForkMeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
