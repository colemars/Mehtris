import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";
import * as p5 from 'p5';
import { SquareTetromino } from '../models/square_tetromino.model';
import { Generate } from '../models/generate.model'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  body: any;
  p5 : any;
  constructor() {
    this.body;
   }

  ngOnInit() {

    let canvas,
        square,
        bodies = [];

    const sketch = (s) => {

    s.preload = () => {

    }


    s.setup = () => {

      //builds p5 canvas
      let canvas = s.createCanvas(500, 1000);
      let x = (window.innerWidth - s.width) / 2;
      let y = (window.innerHeight - s.height) / 2;
      canvas.position(x,y);
      Generate.run(bodies,0);
      // console.log(bodies)

      // bodies.push(new SquareTetromino(50,50,50,50, 0))

      for (let i = 0; i < bodies.length; i++) {
        //downward tick
        // setInterval(() => {
        //   if (!(this.body.moveDown(s, bodies))) {
        //     bodies.push(new SquareTetromino(50,50,50,50))
        //   }
        // }, 3000);
      }
    }


    s.keyPressed = () => {
      //moves piece within boundaries
      if((s.keyCode === s.DOWN_ARROW)) {
        if (!(this.body.moveDown(s, bodies))) {
          Generate.run(bodies,this.body.id+1);
          console.log(this.body.id)
        }
      } else if ((s.keyCode === s.LEFT_ARROW) && (this.body.posX >= 50)) {
        this.body.moveLeft(s, bodies)
      } else if((s.keyCode === s.RIGHT_ARROW) && (this.body.posX <= 400)) {
        //if moveDown returns false, create new box
          this.body.moveRight(s, bodies)
        }

        let deadPieceArray = [];
        for (let i = 0; i < bodies.length; i++) {
          if(bodies[i].dead === true) {
            deadPieceArray.push(bodies[i])
          }
        }


        let deadPiecePosY = [];
        let deadPieceId = [];
        deadPiecePosY.sort();
        console.log(deadPiecePosY);
        for (let i = 0; i < deadPieceArray.length; i++) {
          deadPiecePosY.push(deadPieceArray[i].posY);
          deadPieceId.push(deadPieceArray[i].id);
        }

        let a = [], b = [], prev;
        for (let i = 0; i < deadPiecePosY.length; i++) {
          if (deadPiecePosY[i] !== prev) {
            a.push(deadPiecePosY[i]);
            b.push(1);
          } else {
            b[b.length-1]++;
          }
          prev = deadPiecePosY[i];
        }

        console.log([a, b])


      //   let test = [];
      //   for (let i = 0; i < bodies.length; i++) {
      //     if (bodies[i].posY === 950){
      //       test.push(bodies[i].id)
      //     }
      //   }
      //   if (test.length === 3) {
      //     // debugger;
      //     for (let i = 0; i < test.length; i++) {
      //       for (let j=0; i < bodies.length; j++) {
      //         if (bodies[j].id === test[i]) {
      //           bodies.splice()
      //         }
      //       }
      //       bodies[test[i]]
      //       // bodies.push(new SquareTetromino(50,50,50,50));
      //       console.log(bodies);
      //     }
      //     test.length = 0;
      //   }
      //   console.log(bodies)
      }


    s.draw = () => {
      s.background('#7FB28A');
      s.noStroke(255);




      //shows all bodies
      for (let i = 0; i < bodies.length; i++) {
          bodies[i].show(s)
      }

      for (let i = 0; i < bodies.length; i++) {
        if (!(bodies[i].dead)) {
          this.body = bodies[i]
        }
        bodies[i].id = i
      }



      // if (this.body.hit(p5, bodies, 0, 50)) {
      //   bodies.push(new SquareTetromino(50,50,50,50))
      // }

    };
  }


  this.p5 = new p5(sketch);
  }

}
