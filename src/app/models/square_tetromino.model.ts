import * as p5 from 'p5';

export class SquareTetromino {
  [x: string]: any;
  constructor(x, y, w, h, posX, posY) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.posX = 50;
    this.posY = 50;
  }

  show(p5) {
     p5.push();
     p5.translate(this.posX, this.posY);
     // p5.rectMode(p5.CENTER);
     p5.rect(0,0,this.w, this.h);
     p5.pop();

  }

}
