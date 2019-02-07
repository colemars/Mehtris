import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";
import * as p5 from 'p5';
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

          bodies.push(new ZBlock(100, 100, 100))

      }

      s.keyPressed = () => {
        let gameArray = []
        // console.log(s.height/10)
        for(let i=0; i<20; i++){
          gameArray.push([[0,0,s.height/20*i],[0, 50,s.height/20*i],[0, 100,s.height/20*i],[0, 150,s.height/20*i],[0, 200,s.height/20*i],[0, 250,s.height/20*i],[0, 300,s.height/20*i],[0, 350,s.height/20*i],[0, 400,s.height/20*i],[0, 450,s.height/20*i]]);
        }

      for (let i = 0; i < bodies.length; i++) {
        bodies[i].blocks.forEach((block => {
          gameArray.forEach((row) => {
              row.forEach((position) => {
                // console.log(position)
                  if (block.y === position[2] && block.x === position[1]) {
                    position[0] = 1;
                }
            })
          })
        }))
          // console.log(gameArray)
      }

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
          console.log("up")
          this.body.rotateClockwise(this.body.x, this.body.y)
        }



      gameArray.forEach((row) => {
          row.forEach((position) => {
            // console.log(position)
              // if (block.y === position[2] && block.x === position[1]) {
              //   position[0] = 1;
            // }
        })
      })

      // console.log(gameArray)
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].blocks.forEach((block) => {
      for (let z = 0; z < gameArray.length; z ++) {
        let row = gameArray[z]
        // console.log(row[0])
        for (let j = 0; j < row.length-1; j++) {
          let position = row[j+1];
          if (block.y+50 === position[2] && block.x === position[1]) {
              if (position[0] === 0) {
                // console.log(position)
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
          let pieceNumber = Math.floor((Math.random() * 4) + 1);
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

      ///I dont know what is going on below here
      ///
      ///
      ///
      //
      //
      //
      //
      ///
      ///
      ///
      //
      //
      //
      //

      let deadPieceArray = [];
      let deadPieceSortedArray = [];
      // console.log("Dead pieces:", deadPieceArray);
      for (let i = 0; i < bodies.length; i++) {
      if(bodies[i].dead === true) {
        deadPieceArray.push(bodies[i]);
        deadPieceSortedArray.push(bodies[i]);
      }
    }

    let deadPiecePosY = [];
    let deadPieceId = [];

    function sortNumbers(a, b) {
      return a - b;
    }

    let testFunction = deadPieceSortedArray.sort(function(a, b) {
      return a.posY - b.posY;
    });


    for (let i = 0; i < deadPieceArray.length; i++) {
      deadPiecePosY.push(deadPieceArray[i].posY);
      deadPieceId.push(deadPieceArray[i].id);
    }

    let posYTrack = [], AmountOfPosY = [], prev;
    for (let i = 0; i < testFunction.length; i++) {
      if (testFunction[i].posY !== prev) {
        posYTrack.push(testFunction[i].posY);
        AmountOfPosY.push(1);
      } else {
        AmountOfPosY[AmountOfPosY.length-1]++;
      }
      prev = testFunction[i].posY;
    }

    // console.log(["Y Position:", posYTrack, "Amount of:", AmountOfPosY])
      // console.log(posYTrack)
    let linesOfArray = [];
    let moveArray =[]
    // console.log(deadPieceArray.length)
    for (let i = 0; i < AmountOfPosY.length; i++) {
      if (AmountOfPosY[i] === 3) {
        // console.log("Line on Y position:", posYTrack[i])
        let line = posYTrack[i]
        // let aboveLine = posYTrack[i-1]
        // console.log(aboveLine)
        for (let j = 0; j < deadPieceArray.length; j++) {
          // if(deadPieceArray[j].posY === aboveLine) {
          //   bodies[bodies.indexOf(deadPieceArray[j])].posY += 50;
          // }
          if(deadPieceArray[j].posY === line) {
            bodies.splice(bodies.indexOf(deadPieceArray[j]), 1);
            // console.log(bodies[bodies.indexOf(deadPieceArray[j+1])])
            // console.log(deadPieceArray)
            // bodies.forEach((body) => {
            //   body.posY += 50;
            // })
          } else {
              moveArray.push(bodies[bodies.indexOf(deadPieceArray[j])])
              console.log(moveArray)
          }
        }
      }
      // else if (AmountOfPosY[i] != 3) {
      //   let line = posYTrack[i]
      //   for (let j = 0; j < deadPieceArray.length; j++) {
      //     if(deadPieceArray[j].posY === line) {
      //       bodies[bodies.indexOf(deadPieceArray[j])].posY += 50;
      //     }
      //   }
      // }
    }

    for (let i = 0; i < moveArray.length; i++) {

      bodies[bodies.indexOf(moveArray[i])].posY += 50;
      console.log('move',i)
      if (i === moveArray.length - 1) {
        moveArray.length = 0;
      }
    }

    // console.log("Lines:", linesOfArray)


  };
}


this.p5 = new p5(sketch);
}

}
