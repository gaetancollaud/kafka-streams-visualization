import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KafkaStreamGraphComponent } from './kafka-stream-graph/kafka-stream-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    KafkaStreamGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
