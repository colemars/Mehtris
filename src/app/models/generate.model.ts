import { SquareTetromino } from '../models/square_tetromino.model'

export class Generate {
  constructor() {

  }

 static run(bodies, id) {
   bodies.push(new SquareTetromino(50,50,50,50, id))
 }

}
