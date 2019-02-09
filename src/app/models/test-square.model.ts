import { TestBlock } from './test_block.model'

export class TestSquare {
  requestedShape: string;
  shapes: any;
  collidedLeft: boolean;
  collidedRight: boolean;
  blocks: any[];
  dead: boolean;
  blockSize: any;
  y: any;
  x: any;
  shape: any;
  constructor(x, y, requestedShape, blockSize){
    this.x = x;
    this.y = y;
    this.shapes = {
      square:{orientation:{up:[[0,1,1,0],[0,1,1,0],[0,0,0,0]],right:[[0,1,1,0],[0,1,1,0],[0,0,0,0]],down:[[0,1,1,0],[0,1,1,0],[0,0,0,0]],left:[[0,1,1,0],[0,1,1,0],[0,0,0,0]]},color:'yellow'},
      ell:{orientation:{up:[[0,0,1],[1,1,1],[0,0,0]],right:[[0,1,0], [0,1,0],[0,1,1]],down:[[0,0,0],[1,1,1],[1,0,0]],left:[[1,1,0],[0,1,0],[0,1,0]]}, color:'orange'},
      antiEll:{orientation:{up:[[1,0,0],[1,1,1],[0,0,0]],right:[[0,1,1],[0,1,0],[0,1,0]],down:[[0,0,0],[1,1,1],[0,0,1]],left:[[0,1,0],[0,1,0],[1,1,0]]}, color:'blue'},
      straight:{orientation:{up:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],right:[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],down:[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],left:[[0,0,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]}, color:'cyan'},
      s:{orientation:{up:[[0,1,1],[1,1,0],[0,0,0]],right:[[0,1,0],[0,1,1],[0,0,1]],down:[[0,0,0],[0,1,1],[1,1,0]],left:[[1,0,0],[1,1,0],[0,1,0]]}, color:'green'},
      t:{orientation:{up:[[0,1,0],[1,1,1],[0,0,0]],right:[[0,1,0],[0,1,1],[0,1,0]],down:[[0,0,0],[1,1,1],[0,1,0]],left:[[0,1,0],[1,1,0],[0,1,0]]}, color:'purple'},
      z:{orientation:{up:[[1,1,0],[0,1,1],[0,0,0]],right:[[0,0,1],[0,1,1],[0,1,0]],down:[[0,0,0],[1,1,0],[0,1,1]],left:[[0,1,0],[1,1,0],[1,0,0]]}, color:'red'}
    };
    this.requestedShape = requestedShape;
    this.shape = this.shapeCheck();
    this.piece;
    this.currentOrientation;
    this.blockSize = blockSize;
    this.collidedLeft = false;
    this.collidedRight = false;
    this.dead = false;
    this.blocks = [];
    this.buildPiece();
  }

  buildPiece() {
    this.blocks = [];
    for(let i = 0; i < this.shape.length; i++){
      for(let j = 0; j < this.shape[i].length; j++){
        if(this.shape[i][j] === 1) {
          this.blocks.push(new TestBlock(this.x + (j*this.blockSize), this.y + (i*this.blockSize), this.blockSize, this.piece.color))
        }
      }
    }
  }

  findCenter() {

  }


  shapeCheck() {
    if (this.requestedShape === 'square') {
      this.piece = this.shapes.square;
      this.currentOrientation = 0;
      return this.shapes.square.orientation.up
    }
    if (this.requestedShape === 'ell') {
      this.piece = this.shapes.ell;
      this.currentOrientation = 0;
      return this.shapes.ell.orientation.up
    }
    if (this.requestedShape === 'antiEll') {
      this.piece = this.shapes.antiEll;
      this.currentOrientation = 0;
      return this.shapes.antiEll.orientation.up
    }
    if (this.requestedShape === 'I') {
      this.piece = this.shapes.straight;
      this.currentOrientation = 0;
      return this.shapes.straight.orientation.up
    }
    if (this.requestedShape === 's') {
      this.piece = this.shapes.s;
      this.currentOrientation = 0;
      return this.shapes.s.orientation.up
    }
    if (this.requestedShape === 't') {
      this.piece = this.shapes.t;
      this.currentOrientation = 0;
      return this.shapes.t.orientation.up
    }
    if (this.requestedShape === 'z') {
      this.piece = this.shapes.z;
      this.currentOrientation = 0;
      return this.shapes.z.orientation.up
    }
  }

  show(p5){
    p5.push();
    // p5.fill('#6B6E9C')
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

  movingBlocks(direction) {
    if (direction === 'down') {
      // get downValue
      let downValue = 0;
      for (let i=0;i<this.shape.length;i++) {
        if (i === this.shape.length-1) {
          for (const position of this.shape[i]) {
            if (position === 1) {
              downValue++
            }
          }
        }
        for (let j=0;j<this.shape[i].length;j++){
          if (this.shape[i+1]) {
            if ((this.shape[i][j]===1) && (this.shape[i+1][j] === 0)) {
              downValue++
            }
          }
        }
      }
      return downValue;
    } else if (direction === 'left') {
      //get leftValue
      let leftValue = 0;
      for (let i=0; i<this.shape.length; i++) {
        if (this.shape[i][0] === 1) {
          leftValue++;
        }
        for (let j=0;j<this.shape[i].length;j++) {
          if (this.shape[i][j-1] === 0) {
            leftValue++
          }
        }
      }
      return leftValue;
    } else if (direction === 'right') {
      //get rightValue
      let rightValue = 0;
      for (let i=0; i<this.shape.length; i++) {
        if (this.shape[i][this.shape[i].length-1] === 1) {
          rightValue++;
        }
        for (let j=0;j<this.shape[i].length;j++) {
          if (this.shape[i][j+1] === 0) {
            rightValue++
          }
        }
      }
      return rightValue;
    }
  }

  noHitDown(bodies, gameArray) {
    let value = 0;
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          if (gameArray[z+1]) {
            let row = gameArray[z];
            let futureRow = gameArray[z+1]
            for (let j = 0; j < row.length; j++) {
              let position = row[j];
              let futurePos = futureRow[j]
              if (block.y === position[2] && block.x === position[1]) {
                if (futurePos[0] === 0) {
                  value += 1
                }
              }
            }
          }
        }
      })
    }
    if (value === this.movingBlocks('down')*bodies.length) {
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
    if (value === this.movingBlocks('left')*bodies.length) {
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
    if (value === this.movingBlocks('right')*bodies.length) {
      return true;
    }
  }

}
