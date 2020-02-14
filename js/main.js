// // search page
// function pageWidget(pages) {
//   const widgetWrap = $(
//     '<div class="widget_wrap"><ul class="widget_list"></ul></div>'
//   );
//   widgetWrap.prependTo('body');
//   for (let i = 0; i < pages.length; i++) {
//     if (pages[i][0] === '#') {
//       $(
//         `<li class="widget_item"><a class="widget_link" href="${pages[i]}">${pages[i]}</a></li>`
//       ).appendTo('.widget_list');
//     } else {
//       $(
//         `<li class="widget_item"><a class="widget_link"
//         href="${pages[i]}.html">${pages[i]}</a></li>`
//       ).appendTo('.widget_list');
//     }
//   }

//   const widgetStilization = $(
//     '<style>body {position:relative} .widget_list{max-height: calc(100vh - 40px); overflow: auto;} .widget_wrap{position:fixed;top:0;left:0;z-index:9999;padding:20px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>'
//   );

//   widgetStilization.prependTo('.widget_wrap');
// }

// $(document).ready(function($) {
//   pageWidget(['index']);
// });

/* Init object fit polyfill */
/* To make it work, add 'font-family: 'object-fit: cover;';' to image */
// if (window.objectFitImages) {
//   window.objectFitImages();
// }

/* Init svg polyfill */
// if (window.svg4everybody) {
//   window.svg4everybody();
// }

$(document).ready(() => {
  // let resizeId;
  let wWidth = $(window).width();
  let navState = false;
  const $header = $('.page-header');
  let isObserver = true;
  let observer;
  let isTouch;

  if (
    !('IntersectionObserver' in window) ||
    !('IntersectionObserverEntry' in window) ||
    !('isIntersecting' in window.IntersectionObserverEntry.prototype)
  ) {
    isObserver = false;
    $('html').removeClass('is-observer');
  }

  if (isObserver) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    });
  }

  function isTouchDevice() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = query => {
      return window.matchMedia(query).matches;
    };

    if (
      'ontouchstart' in window ||
      // eslint-disable-next-line no-undef
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
      ''
    );
    return mq(query);
  }

  if (isTouchDevice()) {
    isTouch = true;
    $('html').addClass('is-touch');
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate, ...args) {
    let timeout;
    return function() {
      const context = this;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // function once(fn, context) {
  //   var result;

  //   return function() {
  //     if (fn) {
  //       result = fn.apply(context || this, arguments);
  //       fn = null;
  //     }

  //     return result;
  //   };
  // }

  // // Usage
  // var canOnlyFireOnce = once(function() {
  //   console.log('Fired!');
  // });

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      const scrollTop = $('html').scrollTop()
        ? $('html').scrollTop()
        : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html')
        .addClass('disable-scrolling')
        .css('top', -scrollTop);
    }
  }

  function enableScrolling() {
    const scrollTop = parseInt($('html').css('top'), 10);
    $('html').removeClass('disable-scrolling');
    $('html,body').scrollTop(-scrollTop);
  }

  function bindEvents() {
    $('.hamburger').on('click', () => {
      if (navState) {
        $header.removeClass('is-opened');
        enableScrolling();
      } else {
        $header.addClass('is-opened');
        disableScrolling();
      }

      navState = !navState;
    });
  }

  const doneResizing = debounce(() => {
    const width = $(window).width();

    if (wWidth !== width) {
      wWidth = width;

      // if (controller !== null && controller !== undefined) {
      //   // completely destroy the controller
      //   controller = controller.destroy(true);
      //   if (controller === null || controller === undefined) {
      //     // reinitialize ScrollMagic only if it is not already initialized
      //     controller = new ScrollMagic.Controller();
      //   }
      // }
    }
  }, 500);

  /* FUNCTION CALLS */
  /* ============= */
  bindEvents();

  // if (isObserver) {
  //   $('.js-visibility').each((i, el) => {
  //     observer.observe(el);
  //   });
  // }

  $(window).on('scroll', () => {});

  $(window).on('load', () => {});

  $(window).on('resize', doneResizing);

  // /* Trigger resize once */
  // function doneResizing() {
  //   const width = $(window).width();

  //   if (wWidth !== width) {
  //     wWidth = width;

  //     if (controller !== null && controller !== undefined) {
  //       // completely destroy the controller
  //       controller = controller.destroy(true);
  //       if (controller === null || controller === undefined) {
  //         // reinitialize ScrollMagic only if it is not already initialized
  //         controller = new ScrollMagic.Controller();
  //       }
  //     }
  //   }
  // }

  // $(window).resize(function() {
  //   clearTimeout(resizeId);
  //   resizeId = setTimeout(doneResizing, 500);
  // });
});
