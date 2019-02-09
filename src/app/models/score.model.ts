export class Score {
  totalLines: number;
  points: number;
  level: number;
  lines: number;

  constructor() {
    this.points = 0;
    this.level = 0;
    this.lines = 0;
    this.totalLines = 0; //total lines
  }

//After a player clears lines, lines here is a number 1 to 4
  addScore() {
    if (this.lines === 1) {
    this.points+=40*(this.level+1);
  } else if (this.lines === 2) {
    this.points+=100*(this.level+1);
  } else if (this.lines === 3) {
    this.points+=300*(this.level+1);
  } else if (this.lines === 4) {
    this.points+=1200*(this.level+1);
  }
  // else {
  //   this.points+=1 //This is an error case
  // }
  return this.points;
  }

//After the score has been updated by addScore(), run this to update the lines and level.
  updateLevel() {
    this.totalLines+=this.lines;
    this.lines = 0;
    this.level = Math.floor(this.totalLines/10);
    return this.level;
  }

}
