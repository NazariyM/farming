import { TimelineMax, TweenMax } from 'gsap';
import { css, detectIE } from '../_helpers';

class Preloader {
  constructor() {
    this.container = document.querySelector('.preloader');
    this.init();
  }
	
  async init() {
    this.animPreloader();
    await this.wait();
  }
	
  wait() {
    return this.resolve;
  }
	
  animPreloader() {
    this.resolve = new Promise(resolve => {

      const tl = new TimelineMax({
        onComplete() {
          resolve();
        }
      });

      tl
        .add(() => {
          this.container.classList.add(css.start);
        }, 0)
        .add(() => {
          this.container.classList.add(css.end);
          if (detectIE()) {
            this.container.classList.add('hide-ie');
          }
        }, 1)
        .add(() => {
          this.container.classList.add(css.hidden);
        }, 2);
    });
  }
}

export const preloader = new Preloader();
