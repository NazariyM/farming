import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';
import { $body, detectIE } from './_helpers';

// import '@fancyapps/fancybox';
// import './components/CustomScroll';
// import './components/Popups';
// import './components/VideoBlock';
// import './components/Header';
import './components/Sliders';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    // objectFitVideos();
    // this.addClassIE();
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }
}

export default new Common();
