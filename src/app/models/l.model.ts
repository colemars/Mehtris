import { TestBlock } from './test_block.model'

export class LBlock {
  [x: string]: any;
	constructor(x, y, w) {
    this.dead = false;
    this.collidedRight = false;
    this.collidedLeft = false;
		this.blocks = [];
		const blockW = 50;
		this.blocks.push(new TestBlock (x, y, blockW));
		this.blocks.push(new TestBlock(x, y - 50, blockW));
		this.blocks.push(new TestBlock(x, y - 100, blockW));
		this.blocks.push(new TestBlock(x, y - 150, blockW));
	}

	show(p5) {
		p5.push();
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
