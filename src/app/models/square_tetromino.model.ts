import * as p5 from 'p5';

export class SquareTetromino {
  [x: string]: any;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.posX = 50;
    this.posY = 50;
    this.id = 0;
    this.dead = false;
  }

  show(p5) {
     p5.push();
     p5.translate(this.posX, this.posY);
     p5.fill("#D8B6FF")
     p5.rect(0,0,this.w, this.h);
     p5.pop();

  }

  moveDown(p5, bodies) {
    if (!(this.hit(p5, bodies, 0, 50))) {
      this.posY += 50
      return true;
    } else {
      this.dead = true;
      return false;
    }
  }

  moveLeft(p5, bodies) {
    if (!(this.hit(p5, bodies, -50, 0))) {
      this.posX -= 50
      return true;
    } else {
      this.dead = true;
      return false;
    }
  }

  moveRight(p5, bodies) {
    if (!(this.hit(p5, bodies, 50, 0))) {
      this.posX += 50
      return true;
    } else {
      this.dead = true;
      return false;
    }
  }

  hit(p5, bodies, side, down) {
    if (this.dead === false) {
      if (this.posY >= 950) {
        return true;
      } else {
        for (let i = 0; i < bodies.length; i++) {
          if (bodies[i].id != this.id) {
            if((this.posX + side < bodies[i].posX + bodies[i].w) && (this.posX + side + this.w > bodies[i].posX) && (this.posY + down < bodies[i].posY + bodies[i].h) && (this.posY + down + this.h > bodies[i].posY)) {
               return true;
              }
            }
          }
        }
      }
    }



  }
