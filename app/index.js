import gsap from 'gsap';
import home from './pages/Home/index.js';
new home();

const gallery = document.querySelector('.home__gallery__slider__wrapper');
const images = gallery.querySelectorAll('a');

images.forEach((img, i) => {
	gsap.set(img, {
		rotateZ:
			i % 2
				? gsap.utils.random(-5, -25) + 'deg'
				: gsap.utils.random(5, 25) + 'deg',
		y: gsap.utils.random(-100, 60) + 'px',
		x: i == 0 || 1 ? 0 : gsap.utils.random(-150, -150) + 'px',
	});
});
