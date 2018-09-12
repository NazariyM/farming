import ScrollMagic from 'Scrollmagic';
import { preloader } from './preloader';

const scrollController = new ScrollMagic.Controller();

export default class ScrollAnim {
	constructor({ el, hook = 0.9, reverse = false, onEnter, onStart } = {}) {
		this.triggerElement = el;
		this.triggerHook = hook;
		this.reverse = reverse;
		this.onStart = onStart;
		this.onEnter = onEnter;

		if (!this.triggerElement) return;
		this.options();
		this.createScene();
	}
	
	options() {
		this.secondEnterVal = 0;
	}
	
	set secondEnterHandler(val) {
		return this.secondEnter = val;
	}
	
	get secondEnterHandler() {
		return this.secondEnter;
	}
	
	async createScene() {
		const _this = this;
		
		await preloader.wait();

		const scene = new ScrollMagic.Scene({
			triggerElement: _this.triggerElement,
			triggerHook: _this.triggerHook,
			reverse: _this.reverse
		})
			.on('start', () => {
				if (typeof _this.onStart !== 'function') return;
				_this.onStart();
			})
			.on('enter', () => {
				if (_this.secondEnterHandler) {
					_this.secondEnterHandler = false;
					return;
				}
				if (typeof _this.onEnter !== 'function') return;
				_this.onEnter();
			})
			.on('leave', () => {
				if (typeof _this.onLeave !== 'function') return;
				_this.onLeave();
			})
			.addTo(scrollController);
	}
}
