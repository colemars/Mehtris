import * as p5 from 'p5';

export class SquareTetromino {
  [x: string]: any;
  constructor(x, y, w, h, posX, posY) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.posX = posX;
    this.posY = posY;
    this.id = 0;
    this.dead = false;
    this.collidedRight = false;
    this.collidedLeft = false;
    this.collidedDown = false;
    this.stop = false;
  }

  show(p5) {
     p5.push();
     p5.translate(this.posX, this.posY);
     // p5.rectMode(p5.CENTER);
     p5.fill("#D8B6FF")
     p5.stroke('black')
     p5.rect(0,0,this.w, this.h);
     p5.pop();

  }

  moveDown(p5, live, bodies) {
    if (!(this.hit(p5, live, 0, 50))) {
      console.log('move')
      this.posY += 50
      return true;
    } else return false;
  }

  moveLeft(p5, live, bodies) {
    if (!(this.hit(p5, live, -50, 0))) {
      this.posX -= 50
      return true;
    } else return false;
  }

  moveRight(p5, live, bodies) {
    if (!(this.hit(p5, live, 50, 0))) {
      this.posX += 50
      return true;
    } else return false;
  }

  hit(p5, live, bodies, w = 50, h = 50) {
    console.log("test")
    if (live.dead === false) {
      for (let i = 0; i < bodies.length; i++) {
        if ((bodies[i].id != live.id) && (bodies[i].dead === true)) {
          console.log("Block to be hit Y pos:", live.posY)
          if((live.posX + w < bodies[i].posX + bodies[i].w) && (live.posX + w + live.w > bodies[i].posX) && (live.posY + h < bodies[i].posY + bodies[i].h) && (live.posY + h + live.h > bodies[i].posY)) {
            console.log("Bodies on hit", bodies)
            live.stop = true;
             return true;
           } else {
             live.stop = false;
           }
          }
        }
      }
    }



  }
