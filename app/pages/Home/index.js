import scrolling from '../../classes/Scrolling.js';
import gallery from './gallery.js';

export default class {
	constructor() {
		const wrapper = document.querySelector('.home__wrapper');
		const scroll = new scrolling({wrapper});
		scroll.enable();
	}
}

new gallery();
