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
  body: any;
  p5 : any;
  constructor() {
    this.body;
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



        bodies.push(new SquareTetromino(200,-50,50,50,200,-50));
        bodies.push(new SquareTetromino(150,-50,50,50,150,-50));
        bodies.push(new SquareTetromino(200,0,50,50,200,0));
        bodies.push(new SquareTetromino(150,0,50,50,150,0));

        for (let i = 0; i < bodies.length; i++) {
          if (bodies[i].dead === false) {
            live.push(bodies[i])
          }
        }



        console.log("Live objects:", live)
        console.log("Just objects:", bodies)
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
          if((s.keyCode === s.RIGHT_ARROW) && (live[i].dead != true) && (live[i].posX <= 400)) {
            if (!(live[i].moveRight(s, bodies))) {
            }
          } else if ((s.keyCode === s.LEFT_ARROW) && (live[i].dead != true) && (live[i].posX >= 50)) {
            if (!(live[i].moveLeft(s, bodies))) {
            }
          } else if((s.keyCode === s.DOWN_ARROW) && (live[i].dead != true) &&(live[i].posY <= 900)) {
            if (!(live[i].moveDown(s, bodies)) || live[i].posY >= 950) {
              live[i].dead = true;
              console.log("Objects:", live, live[i].dead])
            }
          }
        }

      }


    s.draw = () => {
      s.background('#7FB28A');
      s.noStroke(255);

      for(let i=0; i < live.length; i++) {
        if (live[i].dead === true) {
          live.length = 0;
          for (let j = 0; j < bodies.length; j++) {
            bodies[j].dead = true;
          }
          console.log("Objects on board:" bodies)
        }
      }



      for (let i = 0; i < bodies.length; i++) {
        bodies[i].show(s)
      }

      // for (let i = 0; i < bodies.length; i++) {
      //   if (bodies[i].dead === false) {
      //     this.body = bodies[i];
      //   }
      // }

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
    //   console.log(posYTrack)
    let linesOfArray = [];
    let moveArray =[]
    // console.log(deadPieceArray.length)
    for (let i = 0; i < AmountOfPosY.length; i++) {
      if (AmountOfPosY[i] === 10) {
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
              // console.log(moveArray)
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
      // console.log('move',i)
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
