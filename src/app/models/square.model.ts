import { TestBlock } from './test_block.model'

export class Square {
  [x: string]: any;
	constructor(x, y, w) {
    this.dead = false;
    this.collidedRight = false;
    this.collidedLeft = false;
		this.blocks = [];
		const blockW = w / 2;
		this.blocks.push(new TestBlock (x, y, blockW));
		this.blocks.push(new TestBlock(x + blockW, y, blockW));
		this.blocks.push(new TestBlock(x, y + blockW, blockW));
		this.blocks.push(new TestBlock(x + blockW, y + blockW, blockW));
    this.leftValue = 0;
	}

	show(p5) {
		p5.push();
    p5.fill('#F6C44B')
		for (const block of this.blocks) {
      if (block.scored === false) {
        block.show(p5);
      } else {
        this.blocks.splice(this.blocks.indexOf(block), 1)
      }
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
    // console.log(this.collidedLeft)
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

      }
      if (this.blocks[i].x >= 450){
        this.collidedRight = true;

      }
      if (this.blocks[i].x <= 0){
        this.collidedLeft = true;

      }
    }
  }

  noHitDown(bodies, gameArray) {
    let value = 0;
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          if (gameArray[z+1]) {
          let row = gameArray[z+1]

          for (let j = 0; j < row.length; j++) {
            let position = row[j];

            if (block.y+50 === position[2] && block.x === position[1]) {


              if (position[0] === 0) {

                value += 1

              }
            }
          }
        }
        }
      })
    }
    if (value === 2*bodies.length) {
      return true;

    }
  }

  noHitLeft(bodies, gameArray) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          let row = gameArray[z]

          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j-1]
            if (position[1] != 0) {

              if (block.y === position[2] && block.x === position[1]) {

                if (futurePos[0] === 0) {

                  value += 1;

                }
              }
            }
          }
        }
      })
    }

    if (value === 2*bodies.length) {
      return true;

    }
  }

  noHitRight(bodies, gameArray) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          let row = gameArray[z]

          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j+1]
            if (position[1] != 0) {

              if (block.y === position[2] && block.x === position[1]) {

                if (futurePos[0] === 0) {

                  value += 1;

                }
              }
            }
          }
        }
      })
    }

    if (value === 2*bodies.length) {
      return true;

    }
  }

}
