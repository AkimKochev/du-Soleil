import GSAP from 'gsap';

export default class {
	constructor({wrapper, elements}) {
		this.wrapper = wrapper;

		this.scroll = {
			ease: 0.1,
			current: 0,
			target: 0,
		};

		this.resize();
	}

	enable() {
		if (!this.requestId)
			this.requestId = requestAnimationFrame(this.render.bind(this));
	}

	disable() {
		if (this.requestId) {
			window.cancelAnimationFrame(this.requestId);
			this.requestId = undefined;
		}
	}

	render() {
		this.requestId = undefined;
		this.scroll.target = window.scrollY;
		this.scroll.current = GSAP.utils.interpolate(
			this.scroll.current,
			this.scroll.target,
			this.scroll.ease
		);

		GSAP.set(this.wrapper, {y: -this.scroll.current});

		this.enable();
	}

	resize() {
		const height = this.wrapper.getBoundingClientRect().height;

		document.body.style.height = height + 'px';
	}
}
