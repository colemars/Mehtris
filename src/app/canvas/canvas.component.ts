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
        bodies = [],
        count = 0;

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

      bodies.push(new SquareTetromino(50,50,50,50))
    }


    s.keyPressed = () => {
      //moves piece within boundaries
      if((s.keyCode === s.RIGHT_ARROW) && (bodies[count].posX <= 400)) {
        bodies[count].posX += 50;
      } else if ((s.keyCode === s.LEFT_ARROW) && (bodies[count].posX >= 50)) {
        bodies[count].posX -= 50;
      } else if((s.keyCode === s.DOWN_ARROW) && (bodies[count].posY <= 900)) {
        bodies[count].posY += 50;
      }


      if (bodies[count].posY >= 950) {
        count++;
        bodies.push(new SquareTetromino(50,50,50,50))
        console.log(bodies);
      }
      console.log("X", bodies[count].posX)
      console.log("Y", bodies[count].posY)

    }
    // s.centerCanvas = () => {
    //   // canvas = s.createCanvas(200,400); //height of 24 to allow extra space for blocks to spawn
    //   let x = (window.innerWidth - s.width) / 2;
    //   let y = (window.innerHeight - s.height) / 2;
    //   canvas.position(10, 10);
    // }

    s.draw = () => {
      s.background('#7FB28A');
      s.noStroke(255);

      // count = 0;
      // if (bodies[count].posY >= 950) {
      //   posY = 0;
      //   count++;
      //   bodies.push(new SquareTetromino(50,50,50,50, posX = 500, 0))
      //   console.log(bodies);
      // }

      for (let i = 0; i < bodies.length; i++) {
          bodies[i].show(s)
        }


      // console.log('hit')


      // s.background('black');
      // s.noStroke(255);
      // s.fill(170);

    };
  }
  this.p5 = new p5(sketch);

  }

}
