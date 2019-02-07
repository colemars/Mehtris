import { TestBlock } from './test_block.model'

export class ZBlock {
  [x: string]: any;
	constructor(x, y, w) {
    this.dead = false;
    this.collidedRight = false;
    this.collidedLeft = false;
		this.blocks = [];
		const blockW = 50;
		this.blocks.push(new TestBlock (x, y, blockW));
		this.blocks.push(new TestBlock(x + 50, y, blockW));
		this.blocks.push(new TestBlock(x + 50, y + 50, blockW));
		this.blocks.push(new TestBlock(x + 100, y + 50, blockW));
    this.tickClock = 0
	}

	show(p5) {
		p5.push();
    p5.fill('blue')
		for (const block of this.blocks) {
			block.show(p5);
		}
		p5.pop();
	}

  moveDown() {
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.blocks[i].y < 950)) {
        this.blocks[i].y += 50
      }
    }
  }

  moveRight() {
    this.collidedLeft = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedRight === false) && (this.blocks[i].x <= 400)) {
        this.blocks[i].x+= 50
      }
    }
  }

  moveLeft() {
    this.collidedRight = false;
    console.log(this.collidedLeft)
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedLeft === false) && (this.blocks[i].x >= 0)) {
        this.blocks[i].x -= 50
      }
    }
  }

  rotateClockwise(x, y) {

      console.log("Tick", this.tickClock)
      if (this.tickClock === 0) {
        this.blocks[0].x += 50;
        this.blocks[0].y -= 50;
        this.blocks[2].x -= 50;
        this.blocks[2].y -= 50;
        this.blocks[3].x -= 100;
        this.tickClock++
        console.log("Tick in If", this.tickClock)
      } else if (this.tickClock === 1) {
        this.blocks[0].x += 50;
        this.blocks[0].y += 50;
        this.blocks[2].x += 50;
        this.blocks[2].y -= 50;
        this.blocks[3].y -= 100
        this.tickClock++
      } else if (this.tickClock === 2) {
        this.blocks[0].x -= 50;
        this.blocks[0].y += 50;
        this.blocks[2].x += 50;
        this.blocks[2].y += 50;
        this.blocks[3].x += 100;
        this.tickClock++
      } else if (this.tickClock === 3) {
        this.blocks[0].x -= 50;
        this.blocks[0].y -= 50;
        this.blocks[2].x -= 50;
        this.blocks[2].y += 50;
        this.blocks[3].y += 100;
        this.tickClock = 0;
      }


  }

  borderCheck(bodies) {
    for (let i =0; i < this.blocks.length; i++) {
      if (this.blocks[i].y >= 950) {
        this.dead = true;
        // console.log('hit bottom')
      }
      if (this.blocks[i].x >= 450){
        this.collidedRight = true;
        // console.log('hit right')
        // console.log(this.collidedRight)
      }
      if (this.blocks[i].x <= 0){
        this.collidedLeft = true;
        // console.log('hit left')
      }
    }
  }

}
