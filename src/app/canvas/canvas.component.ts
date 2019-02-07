import { Component, OnInit } from '@angular/core';
//required to include scripts in angular.cli and types in tsconfig
import "p5/lib/addons/p5.dom";
import * as p5 from 'p5';
import { SquareTetromino } from '../models/square_tetromino.model'
import { BlockTetromino } from '../models/block_tetromino.model'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  body: any;
  p5 : any;
  constructor() {
    this.body=[];
  }

  ngOnInit() {

    let canvas,
    square,
    bodies = [],
    live = [],
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

        // let blocks = this.body.test(s);
        //
        // for(let i = 0; i <= 4; i++) {
        //   bodies.push(blocks)
        // }

        for(let i = 0; i < 4; i++) {
          bodies.push(new BlockTetromino(200, 100).test(s)[i])
          console.log(bodies[i])
        }

        for (let i = 0; i < bodies.length; i++) {
          if (bodies[i].dead === false) {
            live.push(bodies[i])
          }
        }


        // bodies.push(new SquareTetromino(200,-50,50,50))
        // downward tick
        // setInterval(() => {
        //   if (!(this.body.moveDown(s, bodies)) || this.body.posY >= 950) {
        //     this.body.dead = true;
        //     count++;
        //     bodies.push(new SquareTetromino(200,-50,50,50))
        //     this.body.id += count;
        //   }
        // }, 250);
      }


      s.keyPressed = () => {
        //moves piece within boundaries
        for(let i=0; i < live.length; i++) {

        for (let i = 0; i < live.length; i++) {
          if (live[i].stop === true) {
            for (let j = 0; j < live.length; j++) {
              live[j].stop = true;
            }
          }
        }

        if((s.keyCode === s.RIGHT_ARROW) && (live[i].collidedRight != true) && (live[i].dead != true)) {

          live[i].moveRight(s, live[i], bodies)
        } else if ((s.keyCode === s.LEFT_ARROW) && (live[i].collidedLeft != true) && (live[i].dead != true)) {
          live[i].moveLeft(s, live[i], bodies)
        } else if((s.keyCode === s.DOWN_ARROW) && (live[i].stop != true) && (live[i].dead != true)) {
          console.log(live)
          live[i].moveDown(s, live[i], bodies)
          live[i].hit(s, live[i], bodies)


          // for (let j = 0; j < live.length; j++) {
          //   if(live[j].hit(s, bodies)) {
          //     console.log("stop")
          //   }
          // }
          // live[i].hit(bodies)

            // live[i].collidedDown = true;
            // live[i].dead = true;
            // live[i].collidedRight = false;
            // live[i].collidedLeft = false;

          }
          // console.log("Right:", live[i].collidedRight)
          // console.log("Left:", live[i].collidedLeft)
          // console.log("Down:", live[i].collidedDown)
          // console.log("PosX:", live[i].posX)
        }



      }


      s.draw = () => {
        s.background('#7FB28A');
        s.noStroke(255);

        for (let i = 0; i < live.length; i++) {
          if (live[i].posX === 400) {
            for (let j = 0; j < live.length; j++) {
              live[j].collidedRight = true;
            }
          } else if (live[i].posX === 0) {
            for (let j = 0; j < live.length; j++) {
              live[j].collidedLeft = true;
            }
          } else if (live[i].posY === 950) {
            for (let j = 0; j < live.length; j++) {
              live[j].collidedDown = true;
              live[j].dead = true;
              live[j].collidedRight = false;
              live[j].collidedLeft = false;
            }
          } else {
            for (let j = 0; j < live.length; j++) {
              live[j].collidedRight = false;
              live[j].collidedLeft = false;
              live[j].collidedDown = false;
            }
          }
          if(live[i].dead === true) {
            live.length = 0;
            for(let y = 0; y < bodies.length; y++) {
              bodies[y].dead = true;
            }
            for(let j = 0; j < 4; j++) {
              bodies.push(new BlockTetromino(200, 100).test(s)[j])
            }
            for (let l = 0; l < bodies.length; l++) {
              if (bodies[l].dead === false) {
                live.push(bodies[l])
              }
            }
          }
        }

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
      let moveArray = [];
      let areLines = [];

      for (let i = 0; i < AmountOfPosY.length; i++) {
        if (AmountOfPosY[i] >= 4) {

          // console.log("Line on Y position:", posYTrack[i])
          let line = posYTrack[i]
          areLines.push(line)
          for (let i = 0; i < bodies.length; i++) {

          }

        }
      }

        let tempErasedLines = []

        if(areLines.length === 2) {
          for(let j = 0; j < bodies.length; j++) {
            if((bodies[j].posY === areLines[0]) || (bodies[j].posY === areLines[1]) && (bodies[j].dead === true)) {
              tempErasedLines.push(bodies[j])
            } else {
              moveArray.push(bodies[j])
            }
          }
          for(let i = 0; i < tempErasedLines.length; i++) {
            bodies.splice(bodies[bodies.indexOf(tempErasedLines[i])], 1)
          }
        }

        for (let i = 0; i < bodies.length; i++) {
          bodies[i].show(s)
        }

        for (let i = 0; i < bodies.length; i++) {
          bodies[i].id = i
        }





        for (let i = 0; i < bodies.length; i++) {
          if (bodies[i].dead === false) {
            this.body = bodies[i]
          }
        }

      for (let i = 0; i < moveArray.length; i++) {

      bodies[bodies.indexOf(moveArray[i])].posY += 50;
      // console.log('move',i)
      if (i === moveArray.length - 1) {
        moveArray.length = 0;
      }
    }





        //   // console.log("Line", line)
        //   let aboveLine = posYTrack[i-1]
        //   // console.log(aboveLine)
        //   for (let j = 0; j < deadPieceArray.length; j++) {
        //   if(deadPieceArray[j].posY === aboveLine) {
        //     bodies[bodies.indexOf(deadPieceArray[j])].posY += 50;
        //   }
        // }
      //     if(deadPieceArray[j].posY === line) {
      //     // console.log("Erased pieces:", bodies.indexOf(deadPieceArray[j]), 1)
      //     // console.log("Live pieces:", live)
      //     // console.log("Dead pieces:", deadPieceArray)
      //     bodies.splice(bodies.indexOf(deadPieceArray[j]), 1);
      //     moveArray = []
      //     // console.log(bodies[bodies.indexOf(deadPieceArray[j+1])])
      //     // console.log(deadPieceArray)
      //     // bodies.forEach((body) => {
      //     //   body.posY += 50;
      //     // })
      //
      //   } else {
      //
      //     moveArray.push(bodies[bodies.indexOf(deadPieceArray[j])])
      //     // console.log("Move array after erase:", moveArray)
      //     }
      //   }
      // }





  // for (let i = 0; i < moveArray.length; i++) {
  //   console.log("Move array:", moveArray)
  //   if (moveArray[i] === null) {
  //     break;
  //   } else {
  //     bodies[bodies.indexOf(moveArray[i])].posY += 50;
  //     if (i === moveArray.length - 1) {
  //       moveArray.length = 0;
  //     }
  //   }
  // }

// console.log("Lines:", linesOfArray)


};
}


this.p5 = new p5(sketch);
}

}
