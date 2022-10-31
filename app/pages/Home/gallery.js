import GSAP from 'gsap';

const getTranslateValues = (element) => {
	const style = window.getComputedStyle(element);
	const matrix =
		style['transform'] || style.webkitTransform || style.mozTransform;

	// No transform property. Simply return 0 values.
	if (matrix === 'none' || typeof matrix === 'undefined') {
		return {
			x: 0,
			y: 0,
			z: 0,
		};
	}

	// Can either be 2d or 3d transform
	const matrixType = matrix.includes('3d') ? '3d' : '2d';
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

	// 2d matrices have 6 values
	// Last 2 values are X and Y.
	// 2d matrices does not have Z value.
	if (matrixType === '2d') {
		return {
			x: matrixValues[4],
			y: matrixValues[5],
			z: 0,
		};
	}

	// 3d matrices have 16 values
	// The 13th, 14th, and 15th values are X, Y, and Z
	if (matrixType === '3d') {
		return {
			x: matrixValues[12],
			y: matrixValues[13],
			z: matrixValues[14],
		};
	}
};

export default class {
	constructor() {
		this.gallery = document.querySelector('.home__gallery__slider__wrapper');
		this.addEventsListeners();

		this.scroll = {
			start: 0,
			current: 0,
			end: 0,
			ease: 0.06,
		};
	}

	onTouchDown(e) {
		this.isDown = true;
		this.scroll.start = e.touches ? e.touches[0].clientX : e.clientX;
		this.render();
	}

	onTouchMove(e) {
		if (!this.isDown) return;

		this.scroll.end = e.touches ? e.touches[0].clientX : e.clientX;
		const g = document.querySelector('.home__gallery__slider');
		const {x} = getTranslateValues(g);
		this.xper = x;
	}

	render() {
		this.scroll.current = GSAP.utils.interpolate(
			this.scroll.current,
			this.scroll.start - this.scroll.end + this.xper,
			this.scroll.ease
		);

		GSAP.set('.home__gallery__slider', {x: -this.scroll.current + 'px'});

		requestAnimationFrame(this.render.bind(this));
	}

	onTouchUp(e) {
		this.isDown = false;
	}

	addEventsListeners() {
		this.gallery.addEventListener('mousedown', this.onTouchDown.bind(this));
		this.gallery.addEventListener('mousemove', this.onTouchMove.bind(this));
		this.gallery.addEventListener('mouseup', this.onTouchUp.bind(this));
	}
}
