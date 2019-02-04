import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";
import * as p5 from 'p5';
import { SquareTetromino } from '../models/square_tetromino.model'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  p5 : any;
  constructor() { }

  ngOnInit() {

    let canvas,
        square,
        posX = 0,
        posY = 0;

  const sketch = (s) => {

    s.preload = () => {

    }


    s.setup = () => {

      //builds p5 canvas
      let canvas = s.createCanvas(500, 1000);
      let x = (window.innerWidth - s.width) / 2;
      let y = (window.innerHeight - s.height) / 2;
      canvas.position(x,y);
      // s.background(255, 0, 200);

      square = new SquareTetromino(50,50,50,50, posX, posY)
    }


    s.keyPressed = () => {
      if((s.keyCode === s.RIGHT_ARROW) && (posX <= 400)) {
        posX += 50;
      } else if ((s.keyCode === s.LEFT_ARROW) && (posX >= 50)) {
        posX -= 50;
      } else if((s.keyCode === s.DOWN_ARROW) && (posY <= 900)) {
        posY += 50;
      }




      console.log("X", posX)
      console.log("Y", posY)
      square.move(posX, posY)

    }
    // s.centerCanvas = () => {
    //   // canvas = s.createCanvas(200,400); //height of 24 to allow extra space for blocks to spawn
    //   let x = (window.innerWidth - s.width) / 2;
    //   let y = (window.innerHeight - s.height) / 2;
    //   canvas.position(10, 10);
    // }

    s.draw = () => {
      s.background('green');
      s.noStroke(255);
      square.show(s)
      // console.log('hit')


      // s.background('black');
      // s.noStroke(255);
      // s.fill(170);

    };
  }
  this.p5 = new p5(sketch);

  }

}
