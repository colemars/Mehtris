export class Score {
    points: number;
    level: number;
    lines: number;

  constructor() {
    this.points = 0;
    this.level = 0;
    this.lines = 0;  //total lines
  }

//After a player clears lines, lines here is a number 1 to 4
  addScore(lines) {
    if (lines === 1) {
    this.points+=40*(this.level+1);
  } else if (lines === 2) {
    this.points+=100*(this.level+1);
  } else if (lines === 3) {
    this.points+=300*(this.level+1);
  } else if (lines === 4) {
    this.points+=1200*(this.level+1);
  } else {
    this.points+=1 //This is an error case
  }
  return this.points;
  }

//After the score has been updated by addScore(), run this to update the lines and level.
  updateLevel(lines) {
    this.lines+=lines;
    this.level = Math.floor(this.lines/10);
    return this.level;
  }

}
