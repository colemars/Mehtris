export class GameArray {
  constructor() {
  }

  static gameState(gameArray, bodies, s) {
    //builds off screen matrices
    for (let i=1;i<3; i++) {
        gameArray.push([[0,0,-100/i,0],[0, 50,-100/i,0],[0, 100,-100/i,0],[0, 150,-100/i,0],[0, 200,-100/i,0],[0, 250,-100/i,0],[0, 300,-100/i,0],[0, 350,-100/i,0],[0, 400,-100/i,0],[0, 450,-100/i,0]]);
    }
    //builds on screen matrices
    for(let i=0; i<20; i++){
      gameArray.push([[0,0,s.height/20*i,0],[0, 50,s.height/20*i,0],[0, 100,s.height/20*i,0],[0, 150,s.height/20*i,0],[0, 200,s.height/20*i,0],[0, 250,s.height/20*i,0],[0, 300,s.height/20*i,0],[0, 350,s.height/20*i,0],[0, 400,s.height/20*i,0],[0, 450,s.height/20*i,0]]);
    }

    for (let i = 0; i < bodies.length; i++) {
      bodies[i].blocks.forEach((block => {
        gameArray.forEach((row) => {
          row.forEach((position) => {
            if (block.y === position[2] && block.x === position[1]) {
              //indicates if the block is dead or alive
              if (bodies[i].dead === false) {
                position[3] = 1;
              }
              position[0] = 1;
            }
          })
        })
      }))
    }
    return gameArray
  }
}
