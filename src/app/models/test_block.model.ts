export class TestBlock {
  [x: string]: any;
	constructor(x, y, w) { // no need for h, because it's square
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = w;
    this.scored = false;
	}

	show(p5) {

    p5.stroke('black')
		p5.rect(this.x, this.y, this.w, this.h);
	}
}
