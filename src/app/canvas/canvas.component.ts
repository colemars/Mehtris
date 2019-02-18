import { Component, OnInit } from '@angular/core';
//to use, requires that I include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";

import * as p5 from 'p5';
import { GameArray } from '../models/game-array.model'
import { ScoreCheck } from '../models/score-check.model'
import { Score } from '../models/score.model'
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
        bodies.push(new TestSquare(100, 0, 'ell', 50));
        this.body = bodies[0];
        this.body.fall(bodies, s);

      }

      s.keyPressed = () => {
        let gameArray = []
        // // creates game state // unsure if needed here
        // GameArray.gameState(gameArray, bodies, s)

        this.body.getGameState(bodies, s)

        //moves piece within boundaries
        if(s.keyCode === s.RIGHT_ARROW) {
          if (this.body.noHitRight(bodies)) {
            this.body.moveRight()
          }
        } else if (s.keyCode === s.LEFT_ARROW) {
          if (this.body.noHitLeft(bodies)) {
            this.body.moveLeft()
          }
        } else if(s.keyCode === s.DOWN_ARROW) {
          if (this.body.noHitDown(bodies)) {
            this.body.moveDown()
          } else this.body.dead = true;
        } else if (s.keyCode === s.UP_ARROW) {

          this.body.rotate(bodies, gameArray, s)
        }
      }


    s.draw = () => {

      s.background('#9C8D7A');
      s.noStroke(255);


      for (let i = 0; i < bodies.length; i++) {
        bodies[i].show(s);
      }



      // for (let i = 0; i < bodies.length; i++) {
      //   if (bodies[i].dead === false) {
      //     this.body = bodies[i];
      //   }
      // }

      this.body.borderCheck();

      if (this.body.dead === true) {
        // let pieceNumber = 3;
          // let pieceNumber = Math.floor((Math.random() * 4) + 1);
        let pieceNumber = Math.floor((Math.random() * 7) + 1);
        console.log('number',pieceNumber)
        if (pieceNumber === 1) {
          let square = new TestSquare(100, 100, 'square', 50)
          bodies.push(square)
          this.body = square
        } else if (pieceNumber === 2) {
          let ell = new TestSquare(100, 100, 'ell', 50)
          bodies.push(ell)
          this.body = ell
        } else if (pieceNumber === 3) {
          let antiEll = new TestSquare(100, 100, 'antiEll', 50)
          bodies.push(antiEll)
          this.body = antiEll
        } else if (pieceNumber === 4) {
          let straight = new TestSquare(100, 100, 'I', 50)
          bodies.push(straight)
          this.body = straight
        } else if (pieceNumber === 5) {
          let t = new TestSquare(100, 100, 't', 50)
          bodies.push(t)
          this.body = t
        } else if (pieceNumber === 6) {
          let z = new TestSquare(100, 100, 'z', 50)
          bodies.push(z)
          this.body = z
        } else if (pieceNumber === 7) {
          let s = new TestSquare(100, 100, 's', 50)
          bodies.push(s)
          this.body = s
        }
        this.body.fall(bodies,s)
      }

      //checks if line is full and scores
      ScoreCheck.check(score, bodies, s)
      // console.log(score)




    }
}


this.p5 = new p5(sketch);
}

}
