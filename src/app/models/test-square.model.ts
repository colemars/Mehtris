import { TestBlock } from './test_block.model'
import { GameArray } from '../models/game-array.model'

export class TestSquare {
  gameState: any;
  currentDirection: any;
  nextDirection: any;
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
      square:{orientation:{up:[[0,1,2,0],[0,3,4,0],[0,0,0,0]],right:[[0,1,2,0],[0,3,4,0],[0,0,0,0]],down:[[0,1,2,0],[0,3,4,0],[0,0,0,0]],left:[[0,1,2,0],[0,3,4,0],[0,0,0,0]]},color:'yellow'},
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
      antiEll:{orientation:{
        up:
        [
        [1,0,0],
        [2,3,4],
        [0,0,0]],
        right:
        [
          [0,2,1],
          [0,3,0],
          [0,4,0]],
          down:
          [
            [0,0,0],
            [4,3,2],
            [0,0,1]],
            left:
            [
              [0,4,0],
              [0,3,0],
              [1,2,0]]}, color:'blue'},
      straight:{orientation:{
        up:
        [
          [0,0,0,0],
          [1,2,3,4],
          [0,0,0,0],
          [0,0,0,0]],
          right:
          [
            [0,0,1,0],
            [0,0,2,0],
            [0,0,3,0],
            [0,0,4,0]],
            down:
            [
              [0,0,0,0],
              [0,0,0,0],
              [4,3,2,1],
              [0,0,0,0]],
              left:
              [
                [0,4,0,0],
                [0,3,0,0],
                [0,2,0,0],
                [0,1,0,0]]}, color:'cyan'},
      s:{orientation:{
        up:[
          [0,3,4],
          [1,2,0],
          [0,0,0]],
          right:[
            [0,1,0],
            [0,2,3],
            [0,0,4]],down:[
              [0,0,0],
              [0,2,1],
              [4,3,0]],left:[
                [4,0,0],
                [3,2,0],
                [0,1,0]]}, color:'green'},
      t:{orientation:{
        up:
        [
          [0,4,0],
          [1,2,3],
          [0,0,0]],right:[
            [0,1,0],
            [0,2,4],
            [0,3,0]],down:[
              [0,0,0],
              [3,2,1],
              [0,4,0]],left:[
                [0,3,0],
                [4,2,0],
                [0,1,0]]}, color:'purple'},
      z:{orientation:{up:[
        [1,2,0],
        [0,3,4],
        [0,0,0]],right:[
          [0,0,1],
          [0,3,2],
          [0,4,0]],down:[
            [0,0,0],
            [4,3,0],
            [0,2,1]],left:[
              [0,4,0],
              [2,3,0],
              [1,0,0]]}, color:'red'}
    };
    this.requestedShape = requestedShape;
    this.shape = this.shapeCheck();
    this.piece;
    this.currentOrientation;
    this.currentDirection;
    this.nextDirection;
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
                //finds where to draw blocks
        if(this.shape[i][j] >= 1) {
          this.blocks.push(new TestBlock(this.x + (j*this.blockSize), this.y + (i*this.blockSize), this.blockSize, this.shape[i][j], this.piece.color));
        }
      }
    }
    for (const block of this.blocks){
    }
  }

  getGameState(bodies, s) {
    this.gameState = [];
    this.gameState = GameArray.gameState(this.gameState, bodies, s)
  }

  shapeCheck() {
    if (this.requestedShape === 'square') {
      this.piece = this.shapes.square;
      this.currentOrientation = 0;
      this.currentDirection = 'up';
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
      this.currentDirection = 'up';
      return this.shapes.antiEll.orientation.up
    }
    if (this.requestedShape === 'I') {
      this.piece = this.shapes.straight;
      this.currentOrientation = 0;
      this.currentDirection = 'up';
      return this.shapes.straight.orientation.up
    }
    if (this.requestedShape === 's') {
      this.piece = this.shapes.s;
      this.currentOrientation = 0;
      this.currentDirection = 'up';
      return this.shapes.s.orientation.up
    }
    if (this.requestedShape === 't') {
      this.piece = this.shapes.t;
      this.currentOrientation = 0;
      this.currentDirection = 'up';
      return this.shapes.t.orientation.up
    }
    if (this.requestedShape === 'z') {
      this.piece = this.shapes.z;
      this.currentOrientation = 0;
      this.currentDirection = 'up';
      return this.shapes.z.orientation.up
    }
  }

  show(p5){
    p5.push();
    for (const block of this.blocks) {
      if (block.scored === false) {
       block.show(p5);
     } else {
       this.blocks.splice(this.blocks.indexOf(block), 1)
     }
    }
    p5.pop();
  }

  fall(bodies, p5){
    let tick = setInterval(() => {
      this.getGameState(bodies, p5)
      console.log(bodies)
      if(this.noHitDown(bodies)) {
        this.moveDown()
      } else {
        this.dead = true;
      }
      if (this.dead === true) {
        clearInterval(tick);
      }
    }, 500)
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
    this.collidedRight = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedRight === false) && (this.blocks[i].x <= 400)) {
        this.blocks[i].x+= 50;
      }
    }
  }

  moveLeft() {
    this.x -= 50;
    this.collidedLeft = false;
    this.collidedRight = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedLeft === false) && (this.blocks[i].x >= 0)) {
        this.blocks[i].x -= 50;
      }
    }
  }

  getNextRotate() {
    let nextRotate,
        canary = 0,
        index = 0;
    for (const orientation in this.piece.orientation) {
      index++
      if (canary === 1) {
        nextRotate = this.piece.orientation[orientation];
        this.nextDirection = orientation;
      }
      if (this.currentDirection === orientation) {
                //alerts next loop that it will be the rotation we want
        canary = 1;
                //allows rotation to reset
        if (index === 4) {
          nextRotate = this.piece.orientation.up;
          this.nextDirection = 'up';
        }
      } else canary = 0;
    }
    return nextRotate
  }

  getRotateDiff() {
    let positionalDiffs = [],
        positions = [],
        futureShape = this.getNextRotate(),
        canary = 0;

    for (const row of this.shape) {
      for (const position of row) {
                //if there is a block being drawn here
        if (position > 0) {
          let presentPos,
          futurePos,
          xTranslate,
          yTranslate;

          for (let i=0;i<this.shape.length;i++){
            let presentX = this.shape[i].indexOf(position);
            let presentY = i
                    //if presentX exists
            if (presentX != -1) {
              presentPos = [presentX, i]
            }
          }

          for (let i=0;i<futureShape.length;i++){
            let futureX = futureShape[i].indexOf(position);
            let futureY = i
                    //if futureX exists
            if (futureX != -1) {
              futurePos = [futureShape[i].indexOf(position), i]
            }
          }

                  //finds difference between new and old positions
          let xDiff = presentPos[0] - futurePos[0];
          let yDiff = presentPos[1] - futurePos[1];

                  //translates differences to game space context
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
          positions.push([position, presentPos, futurePos])
        }
      }
    }
    return [positionalDiffs, positions]
  }

  canRotate(bodies, s) {
    let value = 0;
    let positions = this.getRotateDiff()[1];
    let positionalDiffs = this.getRotateDiff()[0];

    for (const positionalDiff of positionalDiffs) {
      for (const block of this.blocks) {
        if (positionalDiff[0] === block.id) {

          //if future block will be beyond the bounds of the canvas, value ++
          if((block.x + positionalDiff[1] < 0) || (block.x + positionalDiff[1] > 450)) {
            value++
          }

          for (let i = 0; i < this.gameState.length; i++) {
            //finds the row our future block is on
            if (block.y+positionalDiff[2] === this.gameState[i][0][2]) {
              for(let j = 0; j<this.gameState[i].length;j++) {
                //finds the column our future block is in
                if (block.x+positionalDiff[1] === this.gameState[i][j][1]) {

                  let presentPos,
                      futurePos;

                  for (const position of positions) {
                    if (position[0] === block.id) {
                      presentPos = position[1];
                      futurePos = position[2];
                    }
                  }

                  // simple array value comparison
                  const isEqual = (array1, array2) => {
                    for (let i = 0; i < array1.length; i++) {
                      if(array1[i] != array2[i]) {
                       return false;
                      }
                    }
                    return true;
                  }

                  //if our future block space is already occupied by a block that is not one of our current blocks, value++
                  if ((this.gameState[i][j][0] === 1) && (isEqual(presentPos, futurePos) === false) && (this.gameState[i][j][3] != 1)) {
                    console.log(block.id,'hit')
                    value++
                  }
                }
              }
            }
          }
        }
      }
    }
    if (value > 0) {
      return false;
    } else return true;
  }

  rotate(bodies, gameArray, s) {

    //checks future block space
    if (this.canRotate(bodies, s)) {
      //clears our current blocks
      this.blocks = [];
      this.shape = this.getNextRotate();
      this.currentDirection = this.nextDirection;


              //builds new rotated peice
      for(let i = 0; i < this.shape.length; i++){
        for(let j = 0; j < this.shape[i].length; j++){
          if(this.shape[i][j] >= 1) {
            this.blocks.push(new TestBlock(this.x + (j*this.blockSize), this.y + (i*this.blockSize), this.blockSize, this.shape[i][j], this.piece.color))
          }
        }
        this.getGameState(bodies, s)
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
            //finds the number blocks we need to look for hit detection on // open space facing blocks
    if (direction === 'down') {
              // get number of blocks facing open space in down direction
      let downValue = 0;
      for (let i=0;i<this.shape.length;i++) {
                //if we are looking at the bottom row we know it will be facing open space
        if (i === this.shape.length-1) {
          for (const position of this.shape[i]) {
                    //if a block is being drawn here, value++
            if (position >= 1) {
              downValue++
            }
          }
        }
        for (let j=0;j<this.shape[i].length;j++){
                  //if there is a row beneath the current looped row
          if (this.shape[i+1]) {
                    //if a block is being drawn here, and the position immediately under it is empty, value++
            if ((this.shape[i][j] >= 1) && (this.shape[i+1][j] === 0)) {
              downValue++
            }
          }
        }
      }
      return downValue;
    } else if (direction === 'left') {
              //get number of blocks facing open space in left direction
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
              //get number of blocks facing open space in right direction
      let rightValue = 0;
      for (let i=0; i<this.shape.length; i++) {
        if (this.shape[i][this.shape[i].length-1] >= 1) {
          rightValue++;
        }
        for (let j=0;j<this.shape[i].length;j++) {
          if ((this.shape[i][j] >= 1) && (this.shape[i][j+1] === 0)) {
            rightValue++
          }
        }
      }
      return rightValue;
    }
  }

  noHitDown(bodies) {
    let value = 0;
            //for each body in bodies
    for (let i = 0; i < bodies.length; i++) {
              //for each block in body
      this.blocks.forEach((block) => {
                //gets gameState
        for (let z = 0; z < this.gameState.length; z ++) {
                  //to prevent errors on last row
          if (this.gameState[z+1]) {
            let row = this.gameState[z];
            let futureRow = this.gameState[z+1]
            for (let j = 0; j < row.length; j++) {
              let position = row[j];
              let futurePos = futureRow[j]
                      //finds our blocks position within our game state
              if (block.y === position[2] && block.x === position[1]) {
                        //if that position within game state is already occupied, value++;
                if (futurePos[0] === 0) {
                  value++;
                }
              }
            }
          }
        }
      })
    }
    console.log(value)
    if (value === this.movingBlocks('down')*bodies.length) {
      return true;
    }
  }

  noHitLeft(bodies) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < this.gameState.length; z ++) {
          let row = this.gameState[z]
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

  noHitRight(bodies) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < this.gameState.length; z ++) {
          let row = this.gameState[z]
          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j+1]
            if (block.y === position[2] && block.x === position[1]) {
              if (futurePos[0] === 0) {
                value += 1;
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
