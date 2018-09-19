import objectFitImages from 'object-fit-images';
import Popup from 'vintage-popup';
import 'ion-rangeslider';
import 'select2';
import { $body, detectIE, $scrolledElements } from './_helpers';

import './components/Popups';
import './components/preloader';
import './components/Anims';
import './components/Header';
import './components/Sliders';
import './components/Chart';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    this.initRangeSliders();
    this.initCustomSelects();
    this.scrollToForm();
    this.initThanksPop();

    this.addClassIE();
  }

  initThanksPop() {
    const $form = $('.js-form');

    $form.on('submit', function (e) {
      e.preventDefault();
      const $this = $(this);

      const thanskPopInstance = $('.thanks-popup__btn').popup();
      thanskPopInstance.open();


      $this[0].reset();
    });
  }

  scrollToForm() {
    const $btn = $('.js-scroll-to');
    const $destination = $('.js-scroll-dest');

    $btn.on('click', (e) => {
      e.preventDefault();
      $scrolledElements.animate({
        scrollTop: $destination.offset().top
      }, 1500);
    });
  }

  initCustomSelects() {
    $('.js-custom-select').select2({
      minimumResultsForSearch: -1
    });
  }

  initRangeSliders() {
    const $rangeBlock = $('.js-range');

    $rangeBlock.each(function (i, block) {
      const $block = $(block);
      const $input = $block.find('.js-range-input');
      const $result = $block.find('.js-range-result');
      const $minVal = $input.data('min-value');
      const $maxVal = $input.data('max-value');
      const $defaultVal = $input.data('default-value');
      const $step = $input.data('step');

      $input.ionRangeSlider({
        grid: false,
        min: $minVal,
        max: $maxVal,
        from: $defaultVal,
        step: $step,
        onStart: function (data) {
            $result.prop('value', data.from);
          },
        onChange: function (data) {
          $result.prop('value', data.from);
        }
      });

      const $instance = $input.data('ionRangeSlider');

      $result.on('change keyup', function () {
        let val = $(this).prop('value');

        if (/\D/g.test(this.value)) {
          this.value = this.value.replace(/\D/g, '');
        }

        if (val < $minVal) {
          val = $minVal;
        } else if (val > $maxVal) {
          val = $maxVal;
        }

        $instance.update({
          from: val
        });
      });
    });
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }
}

export default new Common();
