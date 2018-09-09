import 'slick-carousel';
import { svgIcon } from '../_helpers';

class Sliders {
  constructor() {
    this.$slider = $('.js-slider');
    this.$partnerSld = $('.js-partner-slider');
    this.$newsSld = $('.js-news-slider');

    const iconArr = svgIcon('sld-arr-l');

    this.defaultOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      speed: 800,
      useTransform: true,
      adaptiveHeight: true,
      accessibility: false,
      swipe: true,
      dots: true,
      arrows: false,
      dotsClass: 'slider-dots',
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${iconArr}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${iconArr}</button>`,
      rows: 0
    };

    this.init();
  }

  init() {
    if (this.$slider.length) this.initSlider();
    if (this.$partnerSld.length) this.initPartnerSld();
    if (this.$newsSld.length) this.initNewsSld();
  }

  initSlider() {
    this.$slider.slick($.extend({}, this.defaultOptions));
  }

  initPartnerSld() {
    this.$partnerSld.slick($.extend({}, this.defaultOptions, {
      slidesToShow: 2,
      slidesToScroll: 2
    }));
  }

  initNewsSld() {
    this.$newsSld.slick($.extend({}, this.defaultOptions, {
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: false,
      arrows: true
    }));
  }
}

export default new Sliders();
