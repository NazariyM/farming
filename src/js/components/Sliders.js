import 'slick-carousel';
import { Resp } from '../_helpers';

class Sliders {
  constructor() {
    this.$slider = $('.js-slider');
    this.$partnerSld = $('.js-partner-slider');
    this.$newsSld = $('.js-news-slider');

    const iconArr = `<svg viewBox="0 0 40 105" width="100%" height="100%">
    <g transform="translate(-134 -4867)"><path d="M134.77 4919.85l.5-.35-.5-.35 36-52 2.46 1.7-35.06 50.65 35.06 50.65-2.46 1.7z"></path></g>
</svg>`;

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
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }));

    if (!Resp.isTouches) {
      const st = this.$partnerSld.find('.slick-track');
      const stHeight = st.height();

      this.$partnerSld.slick('slickGoTo', 2, true);
      this.$partnerSld.find('.slick-slide').css('height', stHeight + 'px');
    }
  }

  initNewsSld() {
    this.$newsSld.slick($.extend({}, this.defaultOptions, {
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false
          }
        }
      ]
    }));
  }
}

export default new Sliders();
