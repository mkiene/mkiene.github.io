export class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	normalize() {
		let d = sqrt(this.x * this.x + this.y * this.y);
		this.x /= d;
		this.y /= d;
	}

	add(other) {
		return new Vec2(
			this.x + other.x,
			this.y + other.y);
	}

	sub(other) {
		return new Vec2(
			this.x - other.x,
			this.y - other.y);
	}

	mult(other) {
		return new Vec2(
			this.x * other.x,
			this.y * other.y);
	}

	div(other) {
		return new Vec2(
			this.x / other.x,
			this.y / other.y);
	}

	scale(mag) {
		this.x *= mag;
		this.y *= mag;
	}

	dot(other) {
		return new Vec2(this.x * other.x + this.y * other.y);
	}

	copy() {
		return new Vec2(this.x, this.y);
	}

	project(axis) {
		return new Vec2(this.x * axis.x, this.y * axis.y);
	}
}
