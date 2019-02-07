import { TestBlock } from './test_block.model'

export class Test {
  [x: string]: any;
	constructor(x, y, w) {
    this.dead = false;
		this.blocks = [];
		const blockW = w / 2;
		this.blocks.push(new TestBlock (x, y, blockW));
		this.blocks.push(new TestBlock(x + blockW, y, blockW));
		this.blocks.push(new TestBlock(x, y + blockW, blockW));
		this.blocks.push(new TestBlock(x + blockW, y + blockW, blockW));
	}

	show(p5) {
		p5.push();
		for (const block of this.blocks) {
			block.show(p5);
		}
		p5.pop();
	}
}
