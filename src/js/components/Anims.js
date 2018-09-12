import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from './ScrollAnim';
import { preloader } from './preloader';

class Anims {
  constructor() {
    this.fadeYitem = [...document.querySelectorAll('[data-anim="fade-y"]')];
    this.fadeXitem = [...document.querySelectorAll('[data-anim="fade-x"]')];
    this.staggerY = [...document.querySelectorAll('[data-anim-stagger="fade-y"]')];
    this.staggerX = [...document.querySelectorAll('[data-anim-stagger="fade-x"]')];
    this.sectLabels = [...document.querySelectorAll('.section-label')];

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    for (const item of this.sectLabels) {
      new ScrollAnim({
        el: item,
        hook: 1,
        onEnter() {
          _this.sectLabelsAnim(item);
        }
      });
    }

    for (const item of this.fadeYitem) {
      new ScrollAnim({
        el: item,
        onEnter() {
          _this.fadeYAnim(item);
        }
      });
    }

    for (const item of this.fadeXitem) {
      new ScrollAnim({
        el: item,
        onEnter() {
          _this.fadeXAnim(item);
        }
      });
    }

    for (const item of this.staggerY) {
      new ScrollAnim({
        el: item,
        hook: 0.75,
        onEnter() {
          _this.staggerYAnim(item);
        }
      });
    }

    for (const item of this.staggerX) {
      new ScrollAnim({
        el: item,
        hook: 0.75,
        onEnter() {
          _this.staggerXAnim(item);
        }
      });
    }
  }

  sectLabelsAnim(item) {
    if (!item.classList.contains('section-label_text')) {
      TweenMax.to(item, 1, { autoAlpha: 1, y: 0, ease: Power2.easeOut, delay: .5 });
    } else {
      TweenMax.to(item, 1, { autoAlpha: .27, y: 0, ease: Power2.easeOut, delay: .5 });
    }
  }

  fadeYAnim(item) {
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const delay = item.getAttribute('data-anim-delay') || 0;

    TweenMax.to(item, duration, { autoAlpha: 1, y: 0, ease: Power2.easeOut, delay: delay });
  }

  fadeXAnim(item) {
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const delay = item.getAttribute('data-anim-delay') || 0;

    TweenMax.to(item, duration, { autoAlpha: 1, x: 0, ease: Power2.easeOut, delay: delay });
  }

  staggerYAnim(item) {
    const tl = new TimelineMax();
    const animItems = item.children;
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const staggerDelay = item.getAttribute('data-stagger-delay') || 0.2;

    tl.staggerTo(animItems, duration, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, staggerDelay);
  }

  staggerXAnim(item) {
    const tl = new TimelineMax();
    const animItems = item.children;
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const delay = item.getAttribute('data-anim-delay') || 0;
    const staggerDelay = item.getAttribute('data-stagger-delay') || 0.2;

    tl.staggerTo(animItems, duration, { autoAlpha: 1, x: 0, ease: Power2.easeOut, delay: delay }, staggerDelay);
  }
}

export const AnimsAPI = new Anims();
