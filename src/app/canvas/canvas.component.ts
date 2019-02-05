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
        if (bodies[count].hitHeight(bodies) != "hit left") {
          bodies[count].posX += 50;
        }
      } else if ((s.keyCode === s.LEFT_ARROW) && (bodies[count].posX >= 50)) {
        if (bodies[count].hitHeight(bodies) != "hit right") {
          bodies[count].posX -= 50;
        }
      } else if((s.keyCode === s.DOWN_ARROW) && (bodies[count].posY <= 900)) {
        bodies[count].posY += 50;
      }
      // if (bodies.length > 1) {
      //   if((bodies[0].posX < bodies[1].posX + bodies[1].w) && (bodies[0].posX + bodies[0].w > bodies[1].posX) && (bodies[0].posY < bodies[1].posY + bodies[1].h) && (bodies[0].posY + bodies[0].h > bodies[1].posY)) {
      //     console.log("hit")
      //   }
      // // let test = s.collidePointRect(bodies[0].posX, bodies[0].posY, bodies[1].posX, bodies[1].posY, bodies[1].w, bodies[1].h)
      //
      // }

      // for (let i = 0; i < bodies.length; i++) {
      //   // console.log(bodies[i].hit(s, bodies))
      //   if (bodies[i].hitHeight(s, bodies, down, side)) {
      //     // bodies[i].posY -= 50;
      //     bodies[count].dead = true;
      //     count++;
      //     bodies.push(new SquareTetromino(50,50,50,50))
      //     bodies[count].id += count;
      //   }
      //   // console.log(bodies[i].hit(s, bodies))
      // }

      if (bodies[count].posY >= 950) {
        bodies[count].dead = true;
        count++;
        bodies.push(new SquareTetromino(50,50,50,50))
        bodies[count].id += count;
        console.log(bodies[count].id);
      }


      // console.log("X", bodies[count].posX)
      // console.log("Y", bodies[count].posY)


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
          // bodies[i].hit(s, bodies)
          // console.log(bodies[i].hit(s, bodies))
        }

        for (let i = 0; i < bodies.length; i++) {
          // console.log(bodies[i].hit(s, bodies))
          if (bodies[i].hitHeight(bodies) === "hit top") {
            // bodies[i].posY -= 50;
            bodies[count].dead = true;
            count++;
            bodies.push(new SquareTetromino(50,50,50,50))
            bodies[count].id += count;
          }
          // console.log(bodies[i].hit(s, bodies))
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
