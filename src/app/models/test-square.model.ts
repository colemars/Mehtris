import { TestBlock } from './test_block.model'
import { GameArray } from '../models/game-array.model'

export class TestSquare {
  gameState: any;
  currentDirection: any;
  piece: any;
  currentOrientation: any;
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
    this.gameState = [];
    this.shapes = {
      square:{orientation:{up:[[0,1,2,0],[0,3,4,0],[0,0,0,0]],right:[[0,1,1,0],[0,1,1,0],[0,0,0,0]],down:[[0,1,1,0],[0,1,1,0],[0,0,0,0]],left:[[0,1,1,0],[0,1,1,0],[0,0,0,0]]},color:'yellow'},
      ell:{orientation:{
        up:[
          [0,0,1],
          [4,3,2],
          [0,0,0]],
          right:[
            [0,4,0],
            [0,3,0],
            [0,2,1]],
            down:[
              [0,0,0],
              [2,3,4],
              [1,0,0]],
              left:[
                [1,2,0],
                [0,3,0],
                [0,4,0]]}, color:'orange'},
      antiEll:{orientation:{up:[[1,0,0],[1,1,1],[0,0,0]],right:[[0,1,1],[0,1,0],[0,1,0]],down:[[0,0,0],[1,1,1],[0,0,1]],left:[[0,1,0],[0,1,0],[1,1,0]]}, color:'blue'},
      straight:{orientation:{up:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],right:[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],down:[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],left:[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]}, color:'cyan'},
      s:{orientation:{up:[[0,1,1],[1,1,0],[0,0,0]],right:[[0,1,0],[0,1,1],[0,0,1]],down:[[0,0,0],[0,1,1],[1,1,0]],left:[[1,0,0],[1,1,0],[0,1,0]]}, color:'green'},
      t:{orientation:{up:[[0,1,0],[1,1,1],[0,0,0]],right:[[0,1,0],[0,1,1],[0,1,0]],down:[[0,0,0],[1,1,1],[0,1,0]],left:[[0,1,0],[1,1,0],[0,1,0]]}, color:'purple'},
      z:{orientation:{up:[[1,1,0],[0,1,1],[0,0,0]],right:[[0,0,1],[0,1,1],[0,1,0]],down:[[0,0,0],[1,1,0],[0,1,1]],left:[[0,1,0],[1,1,0],[1,0,0]]}, color:'red'}
    };
    this.requestedShape = requestedShape;
    this.shape = this.shapeCheck();
    this.piece;
    this.currentOrientation;
    this.currentDirection;
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
        if(this.shape[i][j] >= 1) {
          this.blocks.push(new TestBlock(this.x + (j*this.blockSize), this.y + (i*this.blockSize), this.blockSize, this.piece.color))
        }
      }
    }
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
      this.currentDirection = 'up';
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
    this.y+=50;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.blocks[i].y < 950)) {
        this.blocks[i].y += 50;
      }
    }
  }

  moveRight() {
    this.x+=50;
    this.collidedLeft = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedRight === false) && (this.blocks[i].x <= 400)) {
        this.blocks[i].x+= 50;
      }
    }
  }

  moveLeft() {
    this.x -= 50;
    this.collidedRight = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedLeft === false) && (this.blocks[i].x >= 0)) {
        this.blocks[i].x -= 50;
      }
    }
  }

  getRotateDiff() {
    let positionalDiffs = [],
        futureShape,
        canary = 0;

    //gets next rotation
    for (const orientation in this.piece.orientation) {
      if (canary === 1) {
        futureShape = this.piece.orientation[orientation]
      }
      if (this.currentDirection === orientation) {
        canary = 1;
      } else canary = 0;
    }







    for (const row of this.shape) {
      for (const position of row) {
        if (position > 0) {
          let presentPos,
          futurePos,
          xTranslate,
          yTranslate;

          for (let i=0;i<this.shape.length;i++){
            let presentX = this.shape[i].indexOf(position);
            let presentY = i
            if (presentX != -1) {
              presentPos = [presentX, i]
            }
          }

          for (let i=0;i<futurePiece.length;i++){
            let futureX = futurePiece[i].indexOf(position);
            let futureY = i
            if (futureX != -1) {
              futurePos = [futurePiece[i].indexOf(position), i]
            }
          }

          let xDiff = presentPos[0] - futurePos[0];
          let yDiff = presentPos[1] - futurePos[1];

          // console.log(position, presentPos, futurePos)
          /*  console.log(futurePos) */

          /* console.log(yDiff, xDiff) */

          if (yDiff < 0) {
            yTranslate = 50*Math.abs(yDiff)
          } else if (yDiff > 0) {
            yTranslate = -50*Math.abs(yDiff)
          } else yTranslate = 0;

          if (xDiff < 0) {
            xTranslate = 50*Math.abs(xDiff)
          } else if (xDiff > 0) {
            xTranslate = -50*Math.abs(xDiff)
          } else xTranslate = 0;
          positionalDiffs.push([position, xTranslate, yTranslate])
        }
      }
    }
    return positionalDiffs
  }

  canRotate(bodies, gameArray) {
    console.log(this.getRotateDiff());

    for (const block of this.blocks) {
      
      for (let i = 0; i < gameArray.length; i++) {

      }
    }

    // let value = 0;
    // for (let i = 0; i < bodies.length; i++) {
    //   this.blocks.forEach((block) => {
    //     for (let z = 0; z < gameArray.length; z ++) {
    //       if (gameArray[z+1]) {
    //         let row = gameArray[z];
    //         let futureRow = gameArray[z+1]
    //         for (let j = 0; j < row.length; j++) {
    //           let position = row[j];
    //           let futurePos = futureRow[j]
    //           if (block.y === position[2] && block.x === position[1]) {
    //             if (futurePos[0] === 0) {
    //               value += 1
    //             }
    //           }
    //         }
    //       }
    //     }
    //   })
    // }
    // if (value === this.movingBlocks('down')*bodies.length) {
    //   return true;
    // }

  }

  rotate(bodies, gameArray) {
    this.canRotate(bodies, gameArray);
    // debugger;
    this.blocks = [];
    if(this.currentOrientation === 0) {
      // if (this.shape.canRotate(90)) {
        this.shape = this.piece.orientation.right
        this.currentOrientation = 90
      // }
    } else if (this.currentOrientation === 90) {
      this.shape = this.piece.orientation.down
      this.currentOrientation = 180;
    } else if (this.currentOrientation === 180) {
      this.shape = this.piece.orientation.left
      this.currentOrientation = 270;
    } else if (this.currentOrientation === 270) {
      this.shape = this.piece.orientation.up;
      this.currentOrientation = 0;
    }
    for(let i = 0; i < this.shape.length; i++){
      for(let j = 0; j < this.shape[i].length; j++){
        if(this.shape[i][j] >= 1) {
          this.blocks.push(new TestBlock(this.x + (j*this.blockSize), this.y + (i*this.blockSize), this.blockSize, this.piece.color))
        }
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
            if (position >= 1) {
              downValue++
            }
          }
        }
        for (let j=0;j<this.shape[i].length;j++){
          if (this.shape[i+1]) {
            if ((this.shape[i][j] >= 1) && (this.shape[i+1][j] === 0)) {
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
        if (this.shape[i][0] >= 1) {
          leftValue++;
        }
        for (let j=0;j<this.shape[i].length;j++) {
          if ((this.shape[i][j] >= 1) && (this.shape[i][j-1] === 0)) {
            leftValue++
          }
        }
      }
      return leftValue;
    } else if (direction === 'right') {
      //get rightValue
      let rightValue = 0;
      for (let i=0; i<this.shape.length; i++) {
        if (this.shape[i][this.shape[i].length-1] >= 1) {
          console.log('hit here')
          rightValue++;
        }
        for (let j=0;j<this.shape[i].length;j++) {
          if ((this.shape[i][j] >= 1) && (this.shape[i][j+1] === 0)) {
            console.log('hit there')
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
    // console.log('hello')
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
        // console.log(this.blocks)
        for (let z = 0; z < gameArray.length; z ++) {
          let row = gameArray[z]
          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j+1]
            if (block.y === position[2] && block.x === position[1]) {
              if (futurePos[0] === 0) {
                console.log(futurePos)
                value += 1;
              }
            }
          }
        }
      })
    }
    console.log(value)
    console.log(this.movingBlocks('right'))
    if (value === this.movingBlocks('right')*bodies.length) {
      return true;
    }
  }

}
