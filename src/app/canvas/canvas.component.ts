import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";

import * as p5 from 'p5';
import { GameArray } from '../models/game-array.model'
import { LineCheck } from '../models/line-check.model'
import { SquareTetromino } from '../models/square_tetromino.model'
import { Test } from '../models/test.model'
import { LBlock } from '../models/l.model'
import { EllBlock } from '../models/ell.model'
import { AntiEllBlock } from '../models/anti-ell.model'
import { ZBlock } from '../models/z.model'
import { SBlock } from '../models/s.model'
import { TBlock } from '../models/t.model'

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

          bodies.push(new Test(100, 100, 100))

      }

      s.keyPressed = () => {
        let gameArray = []
        //creates game state
        GameArray.gameState(gameArray, bodies, s)

        // //checks if line is full
        // LineCheck.check(gameArray, bodies)

        //moves piece within boundaries
        if(s.keyCode === s.RIGHT_ARROW) {
          if (this.body.noHitRight(bodies, gameArray)) {
            this.body.moveRight()
          }
      } else if (s.keyCode === s.LEFT_ARROW) {
        if (this.body.noHitLeft(bodies, gameArray)) {
          this.body.moveLeft()
        }
      } else if(s.keyCode === s.DOWN_ARROW) {
        if (this.body.noHitDown(bodies, gameArray)) {
          this.body.moveDown()
          } else this.body.dead = true;
        } else if (s.keyCode === s.UP_ARROW) {

          this.body.rotateClockwise(this.body.x, this.body.y)
        }



  for (let i = 0; i < bodies.length; i++) {
    bodies[i].blocks.forEach((block) => {
      for (let z = 0; z < gameArray.length; z ++) {
        let row = gameArray[z]

        for (let j = 0; j < row.length-1; j++) {
          let position = row[j+1];
          if (block.y+50 === position[2] && block.x === position[1]) {
              if (position[0] === 0) {

              }
            }
        }
      }
    })
  }
  }


    s.draw = () => {

      s.background('#9C8D7A');
      s.noStroke(255);


      for (let i = 0; i < bodies.length; i++) {
        bodies[i].show(s);
      }



      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].dead === false) {
          this.body = bodies[i];
        }
      }

      this.body.borderCheck();

      if (this.body.dead === true) {
        let pieceNumber = 1;
          // let pieceNumber = Math.floor((Math.random() * 4) + 1);
        // let pieceNumber = Math.floor((Math.random() * 7) + 1);
        if (pieceNumber === 1) {
          bodies.push(new Test(100, 100, 100));
        } else if (pieceNumber === 2) {
          bodies.push(new LBlock(100, 100, 100))
        } else if (pieceNumber === 3) {
          bodies.push(new ZBlock(100, 100, 100))
        } else if (pieceNumber === 4) {
          bodies.push(new SBlock(100, 100, 100))
        }

      }

      //checks if line is full
      LineCheck.check(bodies, s)

    }
}


this.p5 = new p5(sketch);
}

}
