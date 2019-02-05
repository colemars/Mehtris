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

      for (let i = 0; i < bodies.length; i++) {
          setInterval(function(){
          if (!(bodies[count].moveDown(s, bodies))) {
            count++;
            bodies.push(new SquareTetromino(50,50,50,50))
            bodies[count].id += count;
          }
        }, 3000);
      }
    }


    s.keyPressed = () => {
      //moves piece within boundaries
      if((s.keyCode === s.RIGHT_ARROW) && (bodies[count].posX <= 400)) {
        (bodies[count].moveRight(s, bodies))
      } else if ((s.keyCode === s.LEFT_ARROW) && (bodies[count].posX >= 50)) {
        (bodies[count].moveLeft(s, bodies))
      } else if((s.keyCode === s.DOWN_ARROW)) {
        //if moveDown returns false, create new box
        if (!(bodies[count].moveDown(s, bodies))) {
          count++;
          bodies.push(new SquareTetromino(50,50,50,50))
          bodies[count].id += count;
        }
      }
    }


    s.draw = () => {
      s.background('#7FB28A');
      s.noStroke(255);


      //shows all bodies
      for (let i = 0; i < bodies.length; i++) {
          bodies[i].show(s)
        }



    };
  }


  this.p5 = new p5(sketch);
  }

}
