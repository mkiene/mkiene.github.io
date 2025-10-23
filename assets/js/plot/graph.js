import { Vec2, dfdx, newton, nextPointByArcLength, draw_arrow_tip, l } from './index.js';

export class Graph {
	constructor(opts = {}) {
		const defaults = {
			sketch: null,
			domain: [-10, 10],
			range: [-10, 10],
			ppu: 10,
			scale: new Vec2(1, 1),
			origin: new Vec2(0, 0),
			axis_arrow_size: 8,
		};
		this.o = { ...defaults, ...opts };
		this.o.axis_arrow_size /= this.o.ppu;
	}

	render() {
		this.o.sketch.scale(this.o.ppu, -this.o.ppu);
		this.o.sketch.strokeWeight(1 / this.o.ppu);
		this.o.sketch.translate(this.o.origin.x / this.o.ppu, this.o.origin.y / -this.o.ppu);

		this.o.sketch.noFill();
		this.render_axes();
	}

	render_axes() {
		l(this.o.sketch, new Vec2(this.o.domain[0], 0), new Vec2(this.o.domain[1], 0));
		l(this.o.sketch, new Vec2(0, this.o.range[0]), new Vec2(0, this.o.range[1]));

		draw_arrow_tip(this.o.sketch, new Vec2(this.o.domain[0], 0), Math.PI, this.o.axis_arrow_size);
		draw_arrow_tip(this.o.sketch, new Vec2(this.o.domain[1], 0), 0, this.o.axis_arrow_size);

		draw_arrow_tip(this.o.sketch, new Vec2(0, this.o.range[0]), 3 * Math.PI / 2, this.o.axis_arrow_size);
		draw_arrow_tip(this.o.sketch, new Vec2(0, this.o.range[1]), Math.PI / 2, this.o.axis_arrow_size);
	}

	// render_function(f, step = 1) {
	// 	let x = this.o.domain[0];
	// 	let L = step / this.o.scale.x;
	//
	// 	let crossed = [];
	//
	// 	while (x < this.o.domain[1]) {
	// 		if (!f(x)) x += 0.1 * L;
	// 		if (f(x) < this.o.range[0] || f(x) > this.o.range[1] || !f(x)) {
	// 			x += 0.1 * L;
	// 			continue;
	// 		}
	// 		let p1 = new Vec2(x, f(x));
	// 		x = nextPointByArcLength(f, x, L, { dir: 1, initialStep: 0.1 });
	// 		if (f(x) < this.o.range[0] || f(x) > this.o.range[1]) {
	// 			crossed.push(p1.x);
	// 			continue;
	// 		}
	// 		let p2 = new Vec2(x, f(x));
	// 		l(this.o.sketch, p1, p2);
	// 	}
	//
	// 	for (let i = 0; i < crossed.length; i++) {
	// 		let arr_x = crossed[i];
	// 		draw_arrow_tip(this.o.sketch, new Vec2(arr_x, f(arr_x)), Math.atan(dfdx(f, arr_x)), this.o.axis_arrow_size);
	// 	}
	// }

	render_function(f, step = 0.2) {
		let x = this.o.domain[0] / this.o.scale;
		let L = step / this.o.scale;

		while (x < this.o.domain[1] / this.o.scale) {
			let p1 = new Vec2(x * this.o.scale, f(x) * this.o.scale);
			x += L;
			let p2 = new Vec2(x * this.o.scale, f(x) * this.o.scale);
			l(this.o.sketch, p1, p2);
		}
	}
}

