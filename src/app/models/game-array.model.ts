export class GameArray {
  constructor() {
  }

  //After a player clears lines, lines here is a number 1 to 4
  static gameState(gameArray, bodies, s) {
    for(let i=0; i<20; i++){
      gameArray.push([[0,0,s.height/20*i],[0, 50,s.height/20*i],[0, 100,s.height/20*i],[0, 150,s.height/20*i],[0, 200,s.height/20*i],[0, 250,s.height/20*i],[0, 300,s.height/20*i],[0, 350,s.height/20*i],[0, 400,s.height/20*i],[0, 450,s.height/20*i]]);
    }

    for (let i = 0; i < bodies.length; i++) {
      bodies[i].blocks.forEach((block => {
        gameArray.forEach((row) => {
          row.forEach((position) => {
            if (block.y === position[2] && block.x === position[1]) {
              position[0] = 1;
            }
          })
        })
      }))
      // console.log(gameArray)
    }
  }
}
