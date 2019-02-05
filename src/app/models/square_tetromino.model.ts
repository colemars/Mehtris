import * as p5 from 'p5';

export class SquareTetromino {
  [x: string]: any;
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.posX = 50;
    this.posY = 50;
    this.id = 0;
    this.dead = false;
  }

  show(p5) {
    p5.push();
    p5.translate(this.posX, this.posY);
    // p5.rectMode(p5.CENTER);
    p5.fill("#D8B6FF")
    p5.rect(0,0,this.w, this.h);
    p5.pop();

  }

  hitHeight(p5, bodies) {
    if (this.dead === false) {
      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].id != this.id) {
          if (this.posY + this.h == bodies[i].posY && this.posX + this.w == bodies[i].posX + bodies[i].w) {
            console.log("Hit top")
            return true;
          } else if ((this.posX + this.w == bodies[i].posX) && bodies[i].posY + bodies[i].h == this.posY + this.h) {
            // collision detected!
            console.log("Hit left side")

          } else if ((bodies[i].posX + bodies[i].w == this.posX && bodies[i].posY + bodies[i].h == this.posY + this.h)) {
            console.log("Hit right side")
          }
          // if((this.posX < bodies[i].posX + bodies[i].w) && (this.posX + this.w > bodies[i].posX) && (this.posY < bodies[i].posY + bodies[i].h) && (this.posY + this.h + 50 > bodies[i].posY)) {
          //    console.log("hit")
          //    return true;
          //   }
        }
      }
    }
  }
}
