import { SquareTetromino } from './square_tetromino.model'
import * as p5 from 'p5';

export class BlockTetromino {
  [x: string]: any;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.posX = 200;
    this.posY = -50;
    this.id = 0;
    this.dead = false;
  }

  test(p5) {
    let testArray = [];
    testArray.push(new SquareTetromino(this.posX,this.posY,this.w,this.h));
    testArray.push(new SquareTetromino(this.posX - 50,this.posY,this.w,this.h));
    testArray.push(new SquareTetromino(this.posX - 50,this.posY + 50,this.w,this.h));
    testArray.push(new SquareTetromino(this.posX,this.posY + 50,this.w,this.h));
    return testArray;
  }

  show(p5) {
    // console.log('hit')
    for(let i = 0; i <= 4; i++) {

      p5.push();
      p5.translate(this.posX, this.posY);
      // p5.rectMode(p5.CENTER);
      p5.fill("#D8B6FF")
      p5.stroke('black')
      p5.rect(0,0,this.w, this.h);
      p5.pop();
    }

  }

  moveDown(p5, bodies) {
    if (!(this.hit(p5, bodies, 0, 50))) {
      this.posY += 50
      return true;
    } else return false;
  }

  moveLeft(p5, bodies) {
    if (!(this.hit(p5, bodies, -50, 0))) {
      this.posX -= 50
      return true;
    } else return false;
  }

  moveRight(p5, bodies) {
    if (!(this.hit(p5, bodies, 50, 0))) {
      this.posX += 50
      return true;
    } else return false;
  }

  hit(p5, bodies, side, down) {
    if (this.dead === false) {
      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].id != this.id) {
          if((this.posX + side < bodies[i].posX + bodies[i].w) && (this.posX + side + this.w > bodies[i].posX) && (this.posY + down < bodies[i].posY + bodies[i].h) && (this.posY + down + this.h > bodies[i].posY)) {
             console.log("hit")
             return true;
            }
          }
        }
      }
    }



  }
