import { Vec2 } from './index.js';

export function draw_arrow_tip(sketch, pos, theta, size) {
	sketch.noFill();
	let c_theta = Math.PI / 3.3;
	let c_1 = new Vec2(size * Math.cos(theta + c_theta), size * Math.sin(theta + c_theta)).add(pos);
	let c_2 = new Vec2(size * Math.cos(theta - c_theta), size * Math.sin(theta - c_theta)).add(pos);
	let a = 2.5;

	sketch.arc(c_1.x, c_1.y, size * 2, size * 2, a + (theta + c_theta), Math.PI + (theta + c_theta), sketch.OPEN);
	sketch.arc(c_2.x, c_2.y, size * 2, size * 2, Math.PI + (theta - c_theta), (theta - c_theta) - a, sketch.OPEN);
}

export function draw_tangent_line(f, x, len) {
	let halflen = len / 2;
	let theta = atan(df_dx_approx(f, x));

	let tang = new Vec2(cos(theta) * halflen, sin(theta) * halflen);

	stroke(color(0, 255, 0));
	line(x - tang.x, f(x) - tang.y, x + tang.x, f(x) + tang.y);
	stroke(255);
}
