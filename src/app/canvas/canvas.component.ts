import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";
import * as p5 from 'p5';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  p5 : any;
  constructor() { }

  ngOnInit() {

    let canvas;

  const sketch = (s) => {

    s.preload = () => {

    }


    s.setup = () => {

      //builds p5 canvas
      let canvas = s.createCanvas(500, 1000);
      let x = (window.innerWidth - s.width) / 2;
      let y = (window.innerHeight - s.height) / 2;
      canvas.position(x,y);
      s.background(255, 0, 200);
    }

    // s.centerCanvas = () => {
    //   // canvas = s.createCanvas(200,400); //height of 24 to allow extra space for blocks to spawn
    //   let x = (window.innerWidth - s.width) / 2;
    //   let y = (window.innerHeight - s.height) / 2;
    //   canvas.position(10, 10);
    // }

    s.draw = () => {
      // s.background('black');
      // s.noStroke(255);
      // s.fill(170);

    };
  }
  this.p5 = new p5(sketch);

  }

}
