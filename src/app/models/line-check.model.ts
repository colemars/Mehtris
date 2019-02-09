import { GameArray } from './game-array.model'

export class LineCheck {
  constructor() {
  }

  //After a player clears lines, lines here is a number 1 to 4
  static check(score,bodies, s) {
    let gameArray = []
    GameArray.gameState(gameArray, bodies, s)

    for (let i = 0; i < gameArray.length; i++) {
      let blocksInRow = 0;
      let blocksDeadInRow = 0;
      for (let j = 0; j < gameArray[i].length; j++) {
        if (gameArray[i][j][0] === 1) {
          blocksInRow += 1;
        }
      }
      if (blocksInRow === 10) {
        for(let z = 0; z < bodies.length; z++) {
          if (bodies[z].dead === true) {
            for (let k = 0; k < bodies[z].blocks.length; k++) {
              if (gameArray[i][0][2] === bodies[z].blocks[k].y) {
                blocksDeadInRow++;
              }
            }
          }
        }
      }
      if (blocksDeadInRow === 10) {
        score.lines+=1;
        for(const body of bodies) {
          if (body.dead === true) {
            for (const block of body.blocks) {
              if (gameArray[i][0][2] === block.y) {
                block.scored = true;
              } else if (block.y < gameArray[i][0][2]){
                //moves all blocks above this row down
                block.y += 50;
              }
            }
          }
        }
      }
    }
    score.addScore();
    score.updateLevel();
  }
}
