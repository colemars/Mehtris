import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";

import * as p5 from 'p5';
import { GameArray } from '../models/game-array.model'
import { ScoreCheck } from '../models/score-check.model'
import { Score } from '../models/score.model'
import { Square } from '../models/square.model'
import { I } from '../models/I.model'
import { Ell } from '../models/ell.model'
import { AntiEll } from '../models/anti-ell.model'
import { Z } from '../models/z.model'
import { S } from '../models/s.model'
import { T } from '../models/t.model'
import { TestSquare } from '../models/test-square.model'

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
    score,
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

        //instantiates scoring class
        score = new Score();
        console.log(score)

        //creates first piece

      	// let pmShape = [
      	// 	[1, 1, 1, 1],
      	// 	[0, 1, 0, 1],
      	// 	[0, 1, 0, 1],
      	// 	[1, 1, 0, 1],
      	// ]

         let shape = [
           [1,1,0],
           [0,1,1]
         ]
        bodies.push(new TestSquare(100, 100, 'ell', 50))
        // p.display()
        // bodies.push(new Z(100, 100, 100))

      }

      s.keyPressed = () => {
        let gameArray = []
        //creates game state
        GameArray.gameState(gameArray, bodies, s)

        //moves piece within boundaries
        if(s.keyCode === s.RIGHT_ARROW) {
          console.log('key press')
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

          this.body.rotate()
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
        // bodies[i].display(s);
      }



      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].dead === false) {
          this.body = bodies[i];
        }
      }

      this.body.borderCheck();

      if (this.body.dead === true) {
        // console.log('hello')
        // let pieceNumber = 1;
          // let pieceNumber = Math.floor((Math.random() * 4) + 1);
        let pieceNumber = Math.floor((Math.random() * 7) + 1);
        console.log('number',pieceNumber)
        if (pieceNumber === 1) {
          bodies.push(new TestSquare(100, 100, 'square', 50))
        } else if (pieceNumber === 2) {
          bodies.push(new TestSquare(100, 100, 'ell', 50))
        } else if (pieceNumber === 3) {
          bodies.push(new TestSquare(100, 100, 'antiEll', 50))
        } else if (pieceNumber === 4) {
          bodies.push(new TestSquare(100, 100, 'I', 50))
        } else if (pieceNumber === 5) {
          bodies.push(new TestSquare(100, 100, 't', 50))
        } else if (pieceNumber === 6) {
          bodies.push(new TestSquare(100, 100, 'z', 50))
        } else if (pieceNumber === 7) {
          bodies.push(new TestSquare(100, 100, 's', 50))
        }

      }

      //checks if line is full and scores
      ScoreCheck.check(score, bodies, s)
      // console.log(score)




    }
}


this.p5 = new p5(sketch);
}

}
