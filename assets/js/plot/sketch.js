import { Graph, Vec2, newton, descent_root } from "./index.js";

function f(x) {
	return 1 / x;
}

export const sketch = (p) => {

	let g = new Graph({
		sketch: p,
		origin: new Vec2(100, 100),
		ppu: 10,
		scale: 1,
		domain: [-8, 8],
		range: [-8, 8],
	});

	p.setup = () => {
		const c = p.createCanvas(200, 200);
		c.parent('p5-sketch');
	}

	p.draw = () => {
		p.background(50);
		p.stroke(255);

		g.render();
		g.render_function(f);
	}
}
