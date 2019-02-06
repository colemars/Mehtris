import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ScoreComponent } from './score/score.component';



@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
