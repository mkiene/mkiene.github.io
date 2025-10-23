export function dfdx(f, x) {
	// central difference with scale-aware step
	const h = 1e-6 * (1 + Math.abs(x));
	const y1 = f(x + h), y2 = f(x - h);
	return (y1 - y2) / (2 * h);
}

export function arclenIntegrand(f, x) {
	const fp = dfdx(f, x);
	const v = 1 + fp * fp;
	if (!isFinite(v)) return Infinity;
	return Math.sqrt(v);
}

// Adaptive Simpson’s rule with error control
export function simpson(f, a, b) {
	const c = 0.5 * (a + b);
	const fa = f(a), fb = f(b), fc = f(c);
	return (b - a) * (fa + 4 * fc + fb) / 6;
}

export function integrate(f, a, b, tol = 1e-6, maxDepth = 20) {
	function rec(a, b, eps, S, fa, fb, fc, depth) {
		const c = 0.5 * (a + b);
		const d = 0.5 * (a + c);
		const e = 0.5 * (c + b);
		const fd = f(d), fe = f(e);
		const Sleft = (c - a) * (fa + 4 * fd + fc) / 6;
		const Sright = (b - c) * (fc + 4 * fe + fb) / 6;
		const S2 = Sleft + Sright;

		if (!isFinite(S2)) return Infinity;

		if (depth <= 0 || Math.abs(S2 - S) <= 15 * eps) {
			// Richardson extrapolation
			return S2 + (S2 - S) / 15;
		}
		return rec(a, c, eps / 2, Sleft, fa, fc, fd, depth - 1) +
			rec(c, b, eps / 2, Sright, fc, fb, fe, depth - 1);
	}

	const fa = f(a), fb = f(b), fc = f((a + b) / 2);
	const S = (b - a) * (fa + 4 * fc + fb) / 6;
	return rec(a, b, tol, S, fa, fb, fc, maxDepth);
}

// Arc length from a to b of y=f(x)
export function arcLength(f, a, b, tol = 1e-6) {
	// Ensure direction is handled; integrand is positive
	const g = (x) => arclenIntegrand(f, x);
	return integrate(g, a, b, tol);
}

// ---------- robust solver for next x given length ----------
export function nextPointByArcLength(f, x0, L, {
	tolLen = 1e-6,
	tolX = 1e-9,
	maxIter = 64,
	initialStep = 0.1,
	dir = 1,      // +1 forward in x, -1 backward
} = {}) {
	if (L < 0) dir = -dir; // negative lengths flip direction
	const target = Math.abs(L);

	// 1) Bracket: grow [lo, hi] so that S(lo,hi) >= target
	let lo = x0, hi = x0, step = initialStep * dir;
	let S = 0;

	for (let i = 0; i < maxIter; i++) {
		hi = lo + step;
		S = arcLength(f, x0, hi);
		if (!isFinite(S)) break; // hit singularity
		if (S >= target) break;  // bracket found
		step *= 2;               // expand geometrically
	}

	if (!isFinite(S)) {
		// We likely crossed a singularity (e.g., x=0 for 1/x). Abort cleanly.
		throw new Error("Arc length integral diverged (possible singularity on path).");
	}

	// 2) Bisection on F(x) = arcLength(x0, x) - target
	let a = lo, b = hi;
	for (let it = 0; it < maxIter; it++) {
		const mid = 0.5 * (a + b);
		const Smid = arcLength(f, x0, mid);
		if (!isFinite(Smid)) {
			// pull away from singular behavior
			b = mid;
			continue;
		}
		const err = Smid - target;

		if (Math.abs(err) <= tolLen || Math.abs(b - a) <= tolX) {
			return mid;
		}
		// Since arc length is monotone in |x - x0| with positive integrand:
		// decide which half contains the target
		if (err > 0) {
			b = mid;
		} else {
			a = mid;
		}
	}
	// Best effort return midpoint
	return 0.5 * (a + b);
}

export function newton(f, target, start) {
	let x = start;

	for (let i = 0; i < 20; i++) {
		x = -(f(x) - target) / dfdx(f, x) + x;
	}
	return x;
}

export function descent_root(f, start) {
}
