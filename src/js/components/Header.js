import { TimelineMax, TweenMax } from 'gsap';
import {preloader} from './preloader';
import {
  $body,
  throttle,
  css, $header, $scrolledElements
} from '../_helpers';

class Header {
	constructor() {
		this.body = document.querySelector('body');
		this.header = document.querySelector('.header');
		this.nav = this.header.querySelector('.header__nav');
		this.navBtn = this.header.querySelector('.header__nav-btn');
		this.calc = document.querySelector('.calc-block');
		this.init();
	}

	async init() {
    await preloader.wait();
    await this.anim();
		this.initScroll();
		this.bindEvents();
	}

	bindEvents() {
		this.navBtn.addEventListener('click', () => {
			this.toggleMenu();
    });
		 this.onResize();
	}

	anim() {
		const tl = new TimelineMax;

		tl.to(this.header, .5, { autoAlpha: 1, y: 0 })
	}

	onResize() {
    window.onresize = () => {
      this.navBtn.classList.remove(css.active);
      this.nav.classList.remove(css.active);
      this.body.classList.remove(css.locked);
    };
  }

	toggleMenu() {
			this.navBtn.classList.toggle(css.active);
			this.nav.classList.toggle(css.active);
			this.lockBody();
	}

	lockBody() {
    this.body.classList.toggle(css.locked);
	}

	initFix() {
		const _this = this;
		const toggleHeaderScroll = throttle(() => {
			toggleHeader();
		}, 0, this);

		function toggleHeader() {

      if (window.pageYOffset > 0) {
				_this.header.classList.add(css.fixed);
			} else {
				_this.header.classList.remove(css.fixed);
			}
		}

		window.addEventListener('scroll', toggleHeaderScroll);
	}

  initScroll() {
		const _this = this;
    const $link = $header.find('.header__nav-list').find('a');

    $link.on('click', function (e) {
      e.preventDefault();
      const el = $(this).attr('href');
      $body.removeClass(css.locked);

      $scrolledElements.animate({scrollTop: $(el).offset().top }, 1500);
      _this.nav.classList.remove(css.active);
      _this.navBtn.classList.remove(css.active);
      return false;
    });
  }
}

export const HeaderAPI = new Header();
