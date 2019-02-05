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
      if((s.keyCode === s.RIGHT_ARROW) && (this.body.posX <= 400)) {
        if (!(this.body.moveRight(s, bodies))) {
          console.log("hello")
          // bodies[count].dead = true;
          // count++;
          // bodies.push(new SquareTetromino(50,50,50,50))
          // bodies[count].id += count;

        }
      } else if ((s.keyCode === s.LEFT_ARROW) && (this.body.posX >= 50)) {
        if (!(this.body.moveLeft(s, bodies))) {
          console.log("hello")
          // bodies[count].dead = true;
          // count++;
          // bodies.push(new SquareTetromino(50,50,50,50))
          // bodies[count].id += count;

        }
      } else if((s.keyCode === s.DOWN_ARROW) && (this.body.posY <= 900)) {

        //if moveDown returns false, create new box
        if (!(this.body.moveDown(s, bodies)) || this.body.posY >= 950) {
          console.log("hello")
          this.body.dead = true;
          count++;
          bodies.push(new SquareTetromino(50,50,50,50))
          this.body.id += count;

        }
      }

      // if (bodies[count].posY >= 950) {
      //   bodies[count].dead = true;
      //   count++;
      //   bodies.push(new SquareTetromino(50,50,50,50))
      //   bodies[count].id += count;
      //   console.log(bodies[count].id);
      // }

      let deadPieceArray = [];
        let deadPieceSortedArray = [];
        console.log("Dead pieces:", deadPieceArray);
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

        let posYTrack = [], AmmountOfPosY = [], prev;
        for (let i = 0; i < testFunction.length; i++) {
            if (testFunction[i].posY !== prev) {
            posYTrack.push(testFunction[i].posY);
            AmmountOfPosY.push(1);
          } else {
            AmmountOfPosY[AmmountOfPosY.length-1]++;
          }
          prev = testFunction[i].posY;
        }

        console.log(["Y Position:", posYTrack, "Amount of:", AmmountOfPosY])

        let linesOfArray = [];
        for (let i = 0; i < AmmountOfPosY.length; i++) {
          if (AmmountOfPosY[i] === 10) {
            console.log("Line on Y position:", posYTrack[i])
            let line = posYTrack[i]
            for (let j = 0; j < deadPieceArray.length; j++) {
              if(deadPieceArray[j].posY === line) {
                bodies.splice(bodies.indexOf(deadPieceArray[j]), 1)
              }
            }
          }
        }
        console.log("Lines:", linesOfArray)



    }


    s.draw = () => {
      s.background('#7FB28A');
      s.noStroke(255);



      for (let i = 0; i < bodies.length; i++) {
          bodies[i].show(s)
      }

      for (let i = 0; i < bodies.length; i++) {
          if (bodies[i].dead === false) {
            this.body = bodies[i];
          }
        }




    };
  }


  this.p5 = new p5(sketch);
  }

}
