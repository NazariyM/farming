import 'slick-carousel';
import Chart from 'chart.js';
import { svgIcon } from '../_helpers';

class ChartBlock {
  constructor() {
    this.block = document.querySelector('.chart');
    this.nav = this.block.querySelector('.chart__nav');
    this.tabs = this.block.querySelector('.chart__tabs');
    this.charts = this.block.querySelectorAll('.chart__body');
    this.$prevArr = $('.chart__nav-arr_prev');
    this.$nextArr = $('.chart__nav-arr_next');

    if (!this.block) return;

    this.init();
  }

  init() {
    this.initTabs();
    this.initChart();
  }

  initTabs() {
    const iconArr = svgIcon('arr-down');

    $(this.tabs).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      speed: 800,
      dots: true,
      prevArrow: this.$prevArr,
      nextArrow: this.$nextArr,
      dotsClass: 'chart__nav-list',
      appendDots: $(this.nav),
      customPaging: function (slider, i) {
        const $title = $(slider.$slides[i]).find('.chart__tabs-item-data').data('title');
        const $descr = $(slider.$slides[i]).find('.chart__tabs-item-data').data('descr');

        return `<button class="chart__nav-btn" type="button">
          <span class="chart__nav-btn-title">${$title}</span>
          <span class="chart__nav-btn-descr">${$descr}</span>
        </button>`;
      }
    });
  }

  initChart() {
    const labels = [
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30'
    ];

    const data = [
      '0',
      '200',
      '300',
      '200',
      '470',
      '350',
      '200',
      '300',
      '470',
      '350',
    ];

    for (let chart of this.charts) {
      const ctx = chart.getContext('2d');
      const areaGradient = ctx.createLinearGradient(0, 0, 0, 400);
      areaGradient.addColorStop(0, '#552cf3');
      areaGradient.addColorStop(1, 'transparent');

      // background-image: linear-gradient(35deg, #4b32ae 0%, #e24b2e 99%, #e24b2e 100%)

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'СТОИМ.',
            borderWidth: 2,
            borderColor: '#6e56be',
            pointRadius: 0,
            fill: true,
            backgroundColor: areaGradient,
            data: data
          }]
        },
        options: {
          defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'DINPro-Medium'",
          showAllTooltips: true,
          tooltips: {
            intersect: false,
            position: 'nearest',
            xPadding: 12,
            yPadding: 12,
            cornerRadius: 10,
            caretSize: 8,
            caretPadding: 0,
            backgroundColor: '#552cf5',

            custom: function(tooltip) {
              if (!tooltip) return;
              tooltip.displayColors = false;
              tooltip.bodyFontSize = 13;
              tooltip.bodySpacing = 5;
            },
            callbacks: {
              title: function (tooltipItems, data) {
                for (const item of tooltipItems) {
                  return `ВРЕМЯ: ${data.labels[item.index]}`;
                }
              }
            },
          },
          // responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: '#fff',
                fontSize: 13,
                beginAtZero: false,
                maxTicksLimit: 6,
                padding: 20
              },
              gridLines: {
                drawTicks: true,
                color: 'rgba(218,218,218,.3)',
                display: true,
                zeroLineColor: 'rgba(218,218,218,.3)'
              }
            }],
            xAxes: [{
              gridLines: {
                drawTicks: false,
                display: false
              },
              ticks: {
                padding: 20,
                defaultFontColor: '#fff',
                fontColor: '#fff',
                fontSize: 13
              }
            }]
          }
        }
      });
    }
  }
}

export default new ChartBlock();
