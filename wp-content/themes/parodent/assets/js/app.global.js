//*========================================
//* 01 FUNCTIONS ON DOCUMENT READY        =
//*========================================
//* 02 FUNCTIONS CALC & RESIZE, SCROLL    =
//*========================================
//* 03 HEADER                             =
//*========================================
//* 04 SWIPER                             =
//*========================================
//* 05 POPUPS                             =
//*========================================
//* 06 INPUTS, KEY FOCUS                  =
//*========================================
//* 07 TABS, ACCORDION                    =
//*========================================
//* 11 OTHER JS                           =
//*========================================

let _functions = {},
  winW, winH, winScr, isTouchScreen, isAndroid, isIPhone, is_Mac, is_IE, is_Chrome;

jQuery(function ($) {
  "use strict";

  //*=================================
  //* 01 FUNCTIONS ON DOCUMENT READY =
  //*=================================
  isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
    isAndroid = navigator.userAgent.match(/Android/i),
    isIPhone = navigator.userAgent.match(/iPhone/i),
    is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
    is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;


  const $body = $('body');
  setTimeout(function () {
    $body.addClass('loaded');
  }, 500);


  if (isTouchScreen) {
    $('html').addClass('touch-screen');
  }
  if (isAndroid) {
    $('html').addClass('android');
  }
  if (isIPhone) {
    $('html').addClass('ios');
  }
  if (is_Mac) {
    $('html').addClass('mac');
  }
  if (is_IE) {
    $('html').addClass('ie');
  }
  if (is_Chrome) {
    $('html').addClass('chrome');
  }




  //*=====================================
  //* 02 FUNCTIONS CALC & SCROLL, RESIZE =
  //*=====================================
  // Function Calculations on page
  _functions.pageCalculations = function () {
    winW = $(window).width();
    winH = $(window).height();
  }
  _functions.pageCalculations();



  /* Function on page scroll */
  $(window).on('scroll', function () {
    _functions.scrollCall();
  });

  var prev_scroll = 0;
  _functions.scrollCall = function () {
    winScr = $(window).scrollTop();
    if (winScr > prev_scroll) {
      $('header').addClass('scrolled');
    } else if (winScr <= 10) {
      $('header').removeClass('scrolled');
      prev_scroll = 0;
    };
  }
  _functions.scrollCall();





  /* Function on page resize */
  _functions.resizeCall = function () {
    setTimeout(function () {
      _functions.pageCalculations();
    }, 100);
  };

  if (!isTouchScreen) {
    $(window).resize(function () {
      _functions.resizeCall();
    });
  } else {
    window.addEventListener("orientationchange", function () {
      _functions.resizeCall();
    }, false);
  }


// ancors
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 1500);
          $('.mobile-button').removeClass('active');
          $('html').removeClass('overflow-menu');
          $('header').removeClass('open-menu');
          return false;
        }
      }
    });
  });


  //*============
  //* 03 SWIPER =
  //*============
  // Options set Swiper
  _functions.getSwOptions = function (swiper) {
    let options = swiper.data('options');
    options = (!options || typeof options !== 'object') ? {} : options;
    const $p = swiper.closest('.swiper-entry'),
      slidesLength = swiper.closest('.section').find('.swiper-wrapper>.swiper-slide').length;

    if (!options.pagination) options.pagination = {
      el: $p.find('.swiper-pagination')[0],
      clickable: true
    };
    if (swiper.hasClass('type_works')) {
      options.pagination = {
        el: $p.find('.swiper-pagination')[0],
        clickable: true,
        dynamicBullets: true
      }
    }
    if (!options.navigation) options.navigation = {
      nextEl: $p.find('.swiper-button-next')[0],
      prevEl: $p.find('.swiper-button-prev')[0]
    };
    if (options.arrowsOut) options.navigation = {
      nextEl: $p.closest('.section').find('.swiper-button-next')[0],
      prevEl: $p.closest('.section').find('.swiper-button-prev')[0]
    };
    options.preloadImages = false;
    if (options.lazy == true) {
      $p.find('.swiper-slide').find('img').addClass('swiper-lazy').after('<div class="swiper-lazy-preloader"></div>');
    }
    options.lazy = {
      loadPrevNext: true
    };

    options.observer = true;
    options.observeParents = true;
    options.watchOverflow = true;
    options.centerInsufficientSlides = false;
    if (options.speed) options.speed = 1000;
    options.roundLengths = true;
    if (isTouchScreen) options.direction = "horizontal";
    if (slidesLength <= 1) {
      options.loop = false;
    }
    return options;
  };

  // Init each Swiper
  _functions.initSwiper = function (el) {
    const swiper = new Swiper(el[0], _functions.getSwOptions(el));
  };

  $('.swiper-entry .swiper-container').each(function () {
    _functions.initSwiper($(this));

    let $thisSwiper = $(this)[0].swiper;

    if ($thisSwiper.isLocked) {
      $thisSwiper.$wrapperEl.closest('.section').addClass('swiper-controls-hide')
    } else {
      $thisSwiper.$wrapperEl.closest('.section').removeClass('swiper-controls-hide');
    }

    $thisSwiper.on('resize', function () {
      if ($thisSwiper.isLocked) {
        $thisSwiper.$wrapperEl.closest('.section').addClass('swiper-controls-hide')
      } else {
        $thisSwiper.$wrapperEl.closest('.section').removeClass('swiper-controls-hide');
      }
    });
  });

  $(".swiper-thumbs").each(function () {
    var top = $(this).find(".swiper-container.swiper-thumbs-top")[0].swiper,
        bottom = $(this).find(".swiper-container.swiper-thumbs-bottom")[0].swiper;
    top.thumbs.swiper = bottom;
    top.thumbs.init();
    top.thumbs.update();
  });
  

  //*============
  //* 04 HEADER =
  //*============
  /* Open menu */
  $(document).on('click', '.mobile-btn', function () {
    $(this).toggleClass('is-active');
    $('html').toggleClass('overflow-menu');
    $('.nav').toggleClass('open');
  });


  //*============
  //* 05 POPUPS =
  //*============
  // Popups Functions
  let popupTop = 0;
  _functions.removeScroll = function () {
    popupTop = $(window).scrollTop();
    $('html').css({
      "top": -$(window).scrollTop(),
      "width": "100%"
    }).addClass("overflow-hidden");
  }
  _functions.addScroll = function () {
    $('html').removeClass("overflow-hidden");
    window.scroll(0, popupTop);
  }
  _functions.openPopup = function (popup) {
    $('.popup-content').removeClass('active');
    $(popup + ', .popup-wrapper').addClass('active');
    _functions.removeScroll();
  };

  _functions.closePopup = function () {
    $('.popup-wrapper, .popup-content').removeClass('active');
    $('.video-popup iframe').remove();
    _functions.addScroll();
  };

  // Close Zoom popup
  $(document).on('click', '.popup-wrapper .close-popup, .popup-content .layer-close, .popup-container .close-popup', function (e) {
    e.preventDefault();
    _functions.closePopup();
  });


$(document).on('click', '.open-image', function (e) {
  e.preventDefault();
  $('.video-popup-container img').show();
  var image = $(this).attr('href');
  var captionVideo = $(this).attr('data-video-caption');
  $('.video-popup-container img').attr('src', image);
  $('.video-popup-caption').text(captionVideo);
  $('.video-popup-container iframe').hide();
  $('.video-popup').addClass('active');
  $('html').addClass('overflow-hidden');
});



if($('body').hasClass('page-template-single-webinar-video')){
    $(document).on('click', '.video-open', function (e) {
      e.preventDefault();
      $('.video-popup').addClass('active');
      $('html').addClass('overflow-hidden');

      if ($(this).attr('data-video') == 'youtube') {
        $('.video-popup-container video').hide();
        $('.video-popup-container iframe').show();
        var video = $(this).attr('href');
        $('.video-popup-container iframe').attr('src', video);
      }

      if ($(this).attr('data-video') == 'local') {
        $('.video-popup-container iframe').hide();
        $('.video-popup-container video').show();
        var video = $(this).attr('href');
        $('.video-popup-container video').attr('src', video);
      }
    });
} else{
  $(document).on('click', '.video-open', function (e) {
      $('.video-popup-container iframe').show();
      e.preventDefault();
      var video = $(this).attr('href');
      var captionVideo = $(this).attr('data-video-caption');
      $('.video-popup-container iframe').attr('src', video);
      $('.video-popup-caption').text(captionVideo);
      $('.video-popup').addClass('active');
      $('.video-popup-container img').hide();
      $('html').addClass('overflow-hidden');
      $('.video-popup-container video').hide();
  });
}

  // pausing videos on popup close
  _functions.pausePopupVideo = function () {
    if (document.querySelector(".embed-responsive video"))
      console.log('df')
    document
        .querySelectorAll(".embed-responsive video")
        .forEach((video) => {
          video.pause();
          video.currentTime = 0;
        });
  };

$('.video-popup-close, .video-popup .video-popup-layer').on('click', function (e) {

  _functions.pausePopupVideo();
  $('.video-popup').removeClass('active');

  $('html').removeClass('overflow-hidden');
  $('.video-popup-container iframe').attr('src', 'about:blank');

  e.preventDefault();

});









  //*=======================
  //* 06 INPUTS, KEY FOCUS =
  //*=======================
  // Inputs
  $(document).on('focus', '.input-field-wrapp .input', function () {
    $(this).closest('.input-field-wrapp').addClass('focus');
  });

  $(document).on('blur', '.input-field-wrapp .input', function () {
    $(this).closest('.input-field-wrapp').removeClass('focus');
  });
  $(document).on('keyup', '.input-field-wrapp .input', function () {
    if ($(this).val()) $(this).closest('.input-field-wrapp').addClass('value');
    else $(this).closest('.input-field-wrapp').removeClass('value');
  });


  // Invalid Input
  $(document).on('blur', '.input-field-wrapp .input[required]', function () {
    if ($(this).val().trim()) {
      $(this).closest('.input-field-wrapp').removeClass('invalid');
    } else {
      $(this).closest('.input-field-wrapp').addClass('invalid');
    }
  });


  // Check if input has value or autofill
  $(document).ready(function () {
    $('.input-field-wrapp .input').each(function () {
      let $this = $('.input-field-wrapp .input')
      if ($this.val()) {
        $this.closest('.input-field-wrapp').addClass('value');
      }
    });

    $('.input-field-wrapp .input:-webkit-autofill').each(function () {
      let $this = $('.input-field-wrapp .input')

      $this.closest('.input-field-wrapp').addClass('value');
    });
  });

    $(document).on( 'focus', '.input[name="phone"]', function () {
        $(this).inputmask( '+38 (999) 999 - 9999', {
            'placeholder' : '+38 (ххх) ххх - хххх'
        } );
    } );

  // Detect if user is using keyboard tab-button to navigate
  // with 'keyboard-focus' class we add default css outlines
  function keyboardFocus(e) {
    if (e.keyCode !== 9) {
      return;
    }

    switch (e.target.nodeName.toLowerCase()) {
      case 'input':
      case 'select':
      case 'textarea':
        break;
      default:
        document.documentElement.classList.add('keyboard-focus');
        document.removeEventListener('keydown', keyboardFocus, false);
    }
  }
  document.addEventListener('keydown', keyboardFocus, false);




  //*======================
  //* 07 TABS, ACCORDION  =
  //*======================
  // Tabs
  $(document).on('click', '.tab-title', function () {
    $(this).closest('.tab-nav').toggleClass('active');
  });

  $(document).on('click', '.tab-toggle>div', function (e) {
    e.preventDefault();
    var tab = $(this).closest('.tabs').find('.tabs-block .tab');
    var i = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    tab.eq(i).siblings('.tab:visible').stop().finish().fadeOut(function () {
      tab.eq(i).fadeIn(200);
    });
    $(this).closest('.tab-nav').removeClass('active').find('.tab-title').text($(this).text());
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.tab-nav').length && $(window).width() < 991) {
      $('.tab-nav').removeClass('active');
    }
  });

  // Accordion
  $(document).on('click', '.accordion .accordion-title', function () {
    var header_height = $('header').height()+100,
				current = $(this).parent();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').next().slideUp();
    } else {
      $(this).closest('.accordion-wrapp').find('.accordion-title').not(this).removeClass('active').next().slideUp();
      $(this).addClass('active').next().slideDown(function(){
        			pageScroll(current,header_height);
        		});
    }
  });


	function pageScroll(current,header_height){
		$('html, body').animate({scrollTop: current.offset().top - header_height}, 700);
	}
  


  // sumoselect init
  if($('.select-box').length){
    $('.SelectBox').each(function(){
      if($(this).hasClass('search')){
        $('.SelectBox.search').SumoSelect({search: true, searchText: '', placeholder: 'Оберіть дату*'});
      }
      else{
        $('.SelectBox').SumoSelect();
      }
    });
  }


  // note show student
  $("input[name='typekurs']").on("change",function() {
    var val = $(this).val();
    if(val =='student'){
      $('.input-note').show();
    }
    else{
      $('.input-note').hide();
    }
  });

  // show note for reservation
  $("input[name='payment']").on("change",function() {
    var val = $(this).val();
    if(val =='reserve'){
      $('.input-note-payment').show();
    }
    else{
      $('.input-note-payment').hide();
    }
  });


  


  //*==============
  //* 11 OTHER JS =
  //*==============
  // Cookies
  function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  if (!readCookie("dswi-cookies") == true) {
    setTimeout(function () {
      $('.cookies-informer').addClass('active');
    }, 6000);
  }

  $(document).on('click', '.close-cookies', function () {
    $(this).parents('.cookies-informer').removeClass('active');
  });

  $(document).on('click', '.set-cookie', function () {
    createCookie("dswi-cookies", true, 30);
  });



 






  //action popup
  setTimeout(function () {
    if (!readCookie('action-popup') == true) {
      $('.action-popup-wrapp').addClass('active');
      $('.action-popup').addClass('active');
      createCookie('action-popup', true, 1);
    }
  }, 2000);

  $(document).on('click', '.action-popup .btn-close, .action-popup-wrapp .layer-close', function () {
    $('.action-popup').removeClass('active')
    $('.action-popup-wrapp').removeClass('active');
  });

  //visible more text seo block
  $(document).on('click', '.more-text .read-more', function () {
    $(this).parents('.more-text').toggleClass('open');
    $(this).parent().find('.text').slideToggle(555);
    if ($(this).parent().hasClass('open')) {
      $(this).find('b').text($(this).data('read-less'));
    } else {
      $(this).find('b').text($(this).data('read-more'));
    }
  });

  //rellax
  setTimeout(function () {
    if (!is_IE && $('.rellax').length && $(window).width() > 1199) {
      var rellax = new Rellax('.rellax', {
        center: true
      });
    }
  }, 0);

  // change course-image on hover
  if ($(window).width() > 1199) {

    $(document).on("mouseenter", ".courses-wrapper .courses-list-title .title", function () {
      let link = $(this).data('course-img');

      $('.courses-img-wrapper .bg').each(function () {
        if ($(this).data('number-bg') == link) {
          $(this).addClass('active').siblings().removeClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    });
    $(document).on("mouseleave", ".courses-wrapper .courses-list-title .title", function () {
      $('.courses-wrapper').find('.courses-img-wrapper .bg').removeClass('active');
    });
  }


  $(document).on("change", ".gift-price", function () {
    var newValue = this.value;        
    $('#newValue').html(newValue);
  });


    // range slider
    function load_range_slider(){
        if ( $('.range-slider-wrapper').length ) {
            $('.range-slider-wrapper').each( function() {
                let $min   = parseInt( $(this).find('.slider-range').attr('data-min') ),
                    $max   = parseInt( $(this).find('.slider-range').attr('data-max') ),
                    $step  = parseInt( $(this).find('.slider-range').attr('data-step') ),
                    $value = parseInt( $(this).find('.slider-range').attr('data-min') );
                
                $(this).find('.slider-range').slider( {
                    range : "min",
                    min : $min,
                    max : $max,
                    step : $step,
                    value : $value,
                    slide : function( event, ui ) {
                        $(this).find('#current-value').html( ui.value + ' ₴' );
                        let amount = parseFloat( $('[name="gift-price"]').val() );
                        amount = ui.value;
                        $('[name="gift-price"]').val( amount );
                    },
                    stop : function( event, ui ) {
                    }
                } )
            } );
        }
        updateRangeSlider();
    }

  function updateRangeSlider(){
    var thisSlider = $('.range-slider-wrapper').find('.slider-range');
    if( thisSlider.length ){
      $('.range-slider-wrapper').find('.slider-range').slider("option", "value", thisSlider.attr('data-value'));
      $('.range-slider-wrapper').find('.slider-range').slider("option", "max", thisSlider.attr('data-max'));
    }
  }
  

  // custom Cursor
  let circle = document.getElementById('circle');
  let circleStyle = circle.style;

  document.addEventListener('mousemove', e => {
    window.requestAnimationFrame(() => {
      circleStyle.top = `${e.clientY - circle.offsetHeight / 2}px`;
      circleStyle.left = `${e.clientX - circle.offsetWidth / 2}px`;
    });
  });

  // $(document).on("mouseenter", ".home .custom-cursor", function () {
  //   circle.classList.add("scale-min");
  //   $(this).css({
  //     "cursor": "none"
  //   });
  // });
  //
  // $(document).on("mouseleave", ".home .custom-cursor", function () {
  //   circle.classList.remove("scale-min");
  //   $(this).removeAttr('style');
  // });
  //
  //
  // $(document).on("mouseenter", ".home .custom-cursor .btn, .home .custom-cursor .tab-toggle > div", function () {
  //   circle.classList.remove("scale-min");
  //   $(this).css({
  //     "cursor": "pointer"
  //   });
  // });
  //
  // $(document).on("mouseleave", ".home .custom-cursor .btn, .home .custom-cursor .tab-toggle > div", function () {
  //   circle.classList.add("scale-min");
  //   $(this).css({
  //     "cursor": "none"
  //   });
  // });


  // Scroll Down
  $(document).on('click', ".scroll-down", function () {
    $('html, body').animate({ scrollTop: $('.banner').outerHeight() - $('.header-inner').outerHeight() }, 1200);
  });









  /*==============================*/
  //scroll animation
  /*==============================*/
  function scrollAnime() {
    if ($('.animate-item').length && !is_IE) {
      $('.animate-item').not('.animated').each(function () {
        var th = $(this);
        if ($(window).scrollTop() >= th.offset().top - ($(window).height() * 1)) {
          th.addClass('animated');
        }
      });
    }
  }
  scrollAnime();
  $(window).on('scroll', function () {
    scrollAnime();
  });

  //filter
  $(document).on('click', '.filter-title', function () {
    $(this).toggleClass('active');
    $(this).next('.filter-inner').slideToggle(500);
  });

  //sidebar
  //menu
  $(document).on('click', '.mobile-btn', function () {
    $('.sidebar').removeClass('active');
    $('.sidebar-btn').removeClass('active');
    $('html').removeClass('overflow-sidebar');
  });
  if ($(window).width() < 992) {

    $('.sidebar-btn').on('click', function () {
      // console.log('123');
      $(this).toggleClass('active');
      $('.sidebar').toggleClass('active');
      if ($(this).hasClass('active')) {
        $('html').addClass('overflow-sidebar')

      } else {
        $('html').removeClass('overflow-sidebar')
      }
    });
    $('.sidebar-overlay').on('click', function () {
      $(this).siblings('.sidebar').removeClass('active');
      $(this).siblings('.sidebar-btn').removeClass('active');
      $('html').removeClass('overflow-sidebar')
    });
  }

  $(document).find('.filter-list').each(function () {
    let listLength = $(this).find('li').length;
    if (listLength < 4) {
      $(this).next('.btn-show-all').addClass('d-none');
    }
    else {
      $(this).next('.btn-show-all').removeClass('d-none');
    }
  });

  $(document).on("click", ".filter .btn-show-all", function () {
    $(this).toggleClass('close');

    let $parent = $(this).parent();
    let $category = $parent.find(".filter-list li:gt(4)");

    if ($category.is(":visible")) {
      $category.hide("slow");
      $('.btn-show-all').text($(this).data('orig-text'));
    } else {
      $category.show("slow");
      $('.btn-show-all').text($(this).data('active-text'));
    }
    return false;
  });


  $(document).on('click', '.filter-btn-reset', function () {
    let $parent = $(this).parent();

    $parent.find('.filter input[type=checkbox]').each(function () {
      this.checked = false;
    });

    // update products filter
    $.post(ajax_security.ajax_url, {
    'action': 'update_product_row',
    'categories': categories,
    'dates': dates,
    'type': post_type,
    'taxonomy': taxonomy
  })
    .done(function (response) {
        var res = $.parseJSON(response);
        if (res.success) {           
          $('.product-list').html(res.content);
          
          setTimeout(function() { 
            $('.product-list .category-row.animate-item').each(function(){
              $(this).addClass('animated');
            });
          }, 500);
          
        }
    })
    .fail(function (response) {
        console.log(response);
    });
  });

  $(window).scroll(function(){
    _functions.removeFixed('.category-sec');
  });
  
  _functions.removeFixed = function(section){
    var scroll = $(window).scrollTop();

    let blockItem = $(section);

    if(blockItem.length){
      let sectionHeight = $(section).height() - 200;
      if (scroll >= sectionHeight) {
        $(section).find('.sidebar-btn').removeClass('show');
      }
      else{
        $(section).find('.sidebar-btn').addClass('show');
      }
    }
  }
  
    $(document).on( 'click', '.open-popup', function( e ) {
        e.preventDefault();

        // update form in popup
        if ( $(this).data('rel') == 'gift-certificate' ) {
            var type           = $(this).data('type'),
                certificate_id = $(this).data('certicate-id');
            
            $.post( ajax_security.ajax_url, {
                'action'         : 'get_certificate_form',
                'type'           : type,
                'certificate_id' : certificate_id,
            } )
            .done( function ( response ) {
                var res = $.parseJSON( response );
                if ( res.success ) {
                    if ( type == 'certain_course_certificate' ) {
                        $('.popup-content[data-rel="gift-certificate"]').addClass('gift-kurs').removeClass('gift-amount');
                    } else if ( type == 'any_summ_certificate' ) {
                        $('.popup-content[data-rel="gift-certificate"]').addClass('gift-amount').removeClass('gift-kurs');
                    }
                    $('.popup-content[data-rel="gift-certificate"]').find('.h3.title').html( res.popup_title );
                    $('.popup-content[data-rel="gift-certificate"]').find('#form-gift-certificate').replaceWith( res.form );
                    
                    load_range_slider();
                    _functions.openPopup('.popup-content[data-rel="gift-certificate"]');
                    
                    if ( $('.select-box').length ) {
                        $('.SelectBox').each( function() {
                            $('.SelectBox').SumoSelect();
                        } );
                    }
                }
            } )
            .fail( function( response ) {
                console.log( response );
            } );
        } else {
            _functions.openPopup( '.popup-content[data-rel="' + $(this).data('rel') + '"]' );
        }
    } );


    // product filters
    $(document).on('click', '.filter-list li input[type="checkbox"]', function () {
        _functions.productFilters();
    } );

    _functions.productFilters = function () {
        var categories = [],
            dates      = [],
            lectors    = [],
            post_type  = $('.filter-list.categories').attr('data-type'),
            taxonomy   = $('.filter-list.categories').attr('data-taxonomy');

        // $('.product-list').css( 'opacity', '0' );

        // get all categories
        $('.filter-list.categories input[type="checkbox"]:checked').each( function() {
            categories.push( $(this).val() );
        } );

        // get all dates
        $('.filter-list.months input[type="checkbox"]:checked').each( function() {
            dates.push( $(this).val() );
        } );


        // get all lectors
        $('.filter-list.lectors input[type="checkbox"]:checked').each( function() {
            lectors.push( $(this).val() );
        } );

        // update products filter
        $.post( ajax_security.ajax_url, {
            'action'     : 'update_product_row',
            'categories' : categories,
            'dates'      : dates,
            'lectors'    : lectors,
            'type'       : post_type,
            'taxonomy'   : taxonomy
        } )
        .done( function( response ) {
            var res = $.parseJSON( response );
            if ( res.success ) {
                $('.product-list').html( res.content );
                setTimeout( function() {
                    $('.product-list .category-row.animate-item').each( function() {
                        $(this).addClass('animated');
                    } );
                }, 500 );
            }
            // $('.product-list').css( 'opacity', '1' );
        } )
        .fail( function( response ) {
            console.log( response );
        } );
    }

    // Generate Products Order
    $(document).on( 'submit', '#form-reserve-course, #form-gift-certificate', function( e ) {
        e.preventDefault();

        var form      = $(this),
            data      = form.serialize(),
            formData  = new FormData(),
            _is_error = false,
            v_email   = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        form.find('[data-required="1"]').each( function() {
            var thisEl  = $(this),
                thisVal = $.trim( thisEl.val() );
            
            if ( thisEl.attr('name') == 'email' && thisVal.search( v_email ) != 0 ) {
                thisEl.closest('.input-field-wrapp').addClass('invalid');
                _is_error = true;
            } else if ( thisEl.attr('name') == 'phone' && Inputmask.isValid( thisVal, { alias: '+38 (999) 999 - 9999' } ) == false ) {
                thisEl.closest('.input-field-wrapp').addClass('invalid');
                _is_error = true;
            } else if ( thisEl.attr('data-required') && ! thisVal ) {
                thisEl.closest('.input-field-wrapp').addClass('invalid');
                _is_error = true;
            } else {
                thisEl.closest('.input-field-wrapp').removeClass('invalid');
            }
        } );

        if ( _is_error ) {
            return false;
        }

        formData.append('action', 'create_order');
        formData.append('form', data);
        formData.append('nonce', form.find('#form-create-order-nonce').val());

        $.ajax( {
            type: "POST",
            url: ajax_security.ajax_url,
            data: formData,
            processData: false,
            contentType: false,
            success: function ( response ) {
                var results = $.parseJSON( response );
                console.log(results);
                if ( results.success ) {
                    form.trigger('reset');
                    if ( results.type == 'reservation' ) {
                        $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                        _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                    }
                    if ( results.type == 'payment' ) {
                        window.location.replace( results.url );
                    }
                } else {
                    $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                    _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                    console.log( results );
                }
            },
            error: function ( response ) {
                var results = $.parseJSON( response );
                console.log( results );
                form.removeClass('loader');
            }
        } );
    } );
    
    $('input[name="rules_of_use"]').change(function(){
      var cb = $(this);
      cb.val(cb.prop('checked'));
    });




    
// webinars 28.12.2022
function parseJson(str) {
    var j;
    try {
        j=JSON.parse(str);
    } catch (e) {
        return false;
    }
    return j;
}

function showMessage(message){
    $('#text-popup').find('.text').html(message);
    _functions.openPopup('#text-popup');
}



$(document).on('click', '.open_webinar_popup', function (e) {
    e.preventDefault();
    var webinar_id = $(this).attr('data-webinar-id');
    $('input[name="post_id"]').val(webinar_id);
    // update products filter
    $.post( ajax_security.ajax_url, {
        'action'     : 'get_date_webinar',
        'webinar_id' : webinar_id
    } )
    .done( function( response ) {
        var res = $.parseJSON( response );
        if ( res.success ) {
          $('.termin_allow_video').css('display', 'block');
            $('.popup_price_webinar_popup').text(res.price);
            $('.popup_allow_video_webinar').text(res.termin);
            
            _functions.openPopup('#vebinar__popup');
        }
        // $('.product-list').css( 'opacity', '1' );
    } )
    .fail( function( response ) {
        console.log( response );
    } );
});


$(document).on('click', '.open_webinar_together_popup', function (e) {
    e.preventDefault();
    var webinar_ids = '';
    $('.cheaper__together-row .col-lg-4').each(function(){
        var webinar_id = $(this).find('.vebinar__list_item').attr('data-web-id');
        webinar_ids += webinar_id+',';
    });
    webinar_ids = webinar_ids.slice(0, -1);

    $('input[name="post_ids"]').val(webinar_ids);
    var price = $('.together__sum-current i').text();

    $.post( ajax_security.ajax_url, {
        'action'     : 'get_date_webinar',
        'webinar_ids' : webinar_ids,
        'price' : price,
    } )
    .done( function( response ) {
        var res = $.parseJSON( response );
        if ( res.success ) {
            $('.termin_allow_video').css('display', 'none');
            $('.popup_price_webinar_popup').text(res.price);
            $('.currency_web').text('грн');
            
            $('.popup_allow_video_webinar').text(res.termin);
            
            _functions.openPopup('#vebinar__popup');
        }
        // $('.product-list').css( 'opacity', '1' );
    } )
    .fail( function( response ) {
        console.log( response );
    });
});



//registration form
$('#registration-form').on('submit', function (e) {
    e.preventDefault();

    $('#registerform_button').addClass('is-loader');

    var is_false = false;

    var first_name = $(this).find('input[name="first_name"]').val();
    if(first_name == ''){
        is_false = true;
        $('input[name="first_name"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="first_name"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    var last_name = $(this).find('input[name="last_name"]').val();
    if(last_name == ''){
        is_false = true;
        $('input[name="last_name"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="last_name"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    var email = $(this).find('input[name="email"]').val();
    if(email == ''){
        is_false = true;
        $('input[name="email"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="email"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    // if(Inputmask.isValid($(this).find('input[name="phone"]').val(), { alias: "+38 (999) 999 99 99"}) == false) {
    //     is_false = true;
    //     $('input[name="phone"]').closest('.input-field-wrapp').addClass('invalid');
    // } else{
    //     $('input[name="phone"]').closest('.input-field-wrapp').removeClass('invalid');
    // }

    var password = $(this).find('input[name="password"]').val();
    if(password == ''){
        is_false = true;
        $('input[name="password"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="password"]').closest('.input-field-wrapp').removeClass('invalid');
    }


    var password2 = $(this).find('input[name="password2"]').val();
    if(password2 == ''){
        is_false = true;
        $('input[name="password2"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="password2"]').closest('.input-field-wrapp').removeClass('invalid');
    }
    

    var agree = $(this).find('input[name="agree"]').val();
    if(agree == ''){
        is_false = true;
        $('#registration-form .checkbox-entry').addClass('invalid');
    } else{
        $('#registration-form .checkbox-entry').removeClass('invalid');
    }


    if(is_false){
        $('#registerform_button').removeClass('is-loader');
        return false;
    }

    var form = $(this);
    var data = form.serializeArray(), formData={};
    console.log(data);
    data.push({name:'action', value:'register_user'});
    //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
    data.map(function(x){formData[x.name] = x.value;});
    form.find('[type=submit]').addClass('btn-disabled');
    form.find('.error-message').text('');
    $.post(ajax_security.ajax_url, formData)
        .done(function (response) {
            var res = parseJson(response);
            console.log(res);
            if (res.success) {
                _functions.openPopup('#vebinar__popup');
                $('.register_popup').remove();
                $('.buy_webinar').removeClass('user_not_login');
                $('.buy_webinar').addClass('user_login');
            } else {
                $('.error_message_register').text(response);
            }
            // setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
        })
        .fail(function (jqXHR, textStatus, error) {
            showMessage(textStatus);
        });
    return false;
});


//login form
$('#login-form').on('submit', function (e) {
    var form = $(this);
    var data = form.serializeArray(), formData={};
    data.push({name:'action', value:'login_user'});
    //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
    data.map(function(x){formData[x.name] = x.value;});
    form.find('[type=submit]').addClass('btn-disabled');
    form.find('.error-message').text('');
    $.post(ajax_security.ajax_url, formData)
        .done(function (response) {
            var res = parseJson(response);
            console.log(res);
            if (res.success) {
              if (res.redirect) setTimeout(function(){location.href = res.redirect;},100);
                // _functions.openPopup('#vebinar__popup');
                // $('.register_popup').remove();
                // $('.buy_webinar').removeClass('user_not_login');
                // $('.buy_webinar').addClass('user_login');
            } else {
                form.find('.error_message_register').text(res.message);
            }
            setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
        })
        .fail(function (jqXHR, textStatus, error) {
            showMessage(textStatus);
        });
    return false;
});



 //reset password form
$('#forgot-password-form').on('submit', function (e) {
    var form = $(this);
    var data = form.serializeArray(), formData={};
    data.push({name:'action', value:'lost_password'});
    //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
    data.map(function(x){formData[x.name] = x.value;});
    form.find('[type=submit]').addClass('btn-disabled');
    form.find('.error-message').text('');
    $.post(ajax_security.ajax_url, formData)
        .done(function (response) {
            var res = parseJson(response);
            if (res.success) {
                $('.message_success').text(res.message);
                $('.error_message_register').text('');
            } else {
                $('.error_message_register').text(response);
                $('.message_success').text('');
            }
            setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
        })
        .fail(function (jqXHR, textStatus, error) {
            showMessage(textStatus);
        });
    return false;
});


//registration form
$('#form-reserve-webinar,#form-reserve-webinar-together').on('submit', function (e) {
    console.log('buy_web');
    e.preventDefault();

    $('#registerform_button').addClass('is-loader');

    var is_false = false;

    var first_name = $(this).find('input[name="first_name"]').val();
    console.log(first_name);
    if(first_name == ''){
        is_false = true;
        $('input[name="first_name"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="first_name"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    var last_name = $(this).find('input[name="last_name"]').val();
    console.log(last_name);
    if(last_name == ''){
        is_false = true;
        $('input[name="last_name"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="last_name"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    var email = $(this).find('input[name="email"]').val();
    console.log(email);
    if(email == ''){
        is_false = true;
        $('input[name="email"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="email"]').closest('.input-field-wrapp').removeClass('invalid');
    }

    // if(Inputmask.isValid($(this).find('input[name="phone"]').val(), { alias: "+38 (999) 999 99 99"}) == false) {
    //     is_false = true;
    //     $('input[name="phone"]').closest('.input-field-wrapp').addClass('invalid');
    // } else{
    //     $('input[name="phone"]').closest('.input-field-wrapp').removeClass('invalid');
    // }

    var password = $(this).find('input[name="password"]').val();
    if(password != undefined && password == ''){
        is_false = true;
        $('input[name="password"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="password"]').closest('.input-field-wrapp').removeClass('invalid');
    }


    var password2 = $(this).find('input[name="password2"]').val();
    if(password2 != undefined && password2 == ''){
        is_false = true;
        $('input[name="password2"]').closest('.input-field-wrapp').addClass('invalid');
    } else{
        $('input[name="password2"]').closest('.input-field-wrapp').removeClass('invalid');
    }



    // if(password != password2){
    //     is_false = true;
    //     $('input[name="password2"]').closest('.input-field-wrapp').addClass('invalid-coincidence');
    // }

    console.log(is_false);


    if(is_false){
        $('#registerform_button').removeClass('is-loader');
        return false;
    }

    var check_user_error = false;
    if(password != undefined && password.length){
      var form = $(this);
      var data = form.serializeArray(), formData={};
      data.push({name:'action', value:'check_user_login'});
      //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
      data.map(function(x){formData[x.name] = x.value;});
      form.find('[type=submit]').addClass('btn-disabled');
      form.find('.error-message').text('');
      $.post(ajax_security.ajax_url, formData)
        .done(function (response) {
            var res = parseJson(response);
            console.log(res);

            if (res.success) {
              var together_price = $('.popup_price_webinar').text(); 
              var data_o      = form.serialize(),
                  formData  = new FormData();
              console.log(data_o);
              formData.append('action', 'create_order');
              formData.append('together_price', together_price);
              formData.append('form', data_o);
              formData.append('nonce', form.find('#form-create-order-nonce').val());

              $.ajax( {
                  type: "POST",
                  url: ajax_security.ajax_url,
                  data: formData,
                  processData: false,
                  contentType: false,
                  success: function ( response ) {
                      console.log(response);
                      var results = $.parseJSON( response );
                      console.log(results);
                      if ( results.success ) {
                          form.trigger('reset');
                          if ( results.type == 'reservation' ) {
                              $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                              _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                          }
                          if ( results.type == 'payment' ) {
                              window.location.replace( results.url );
                          }
                      } else {
                          $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                          _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                          console.log( results );
                      }
                  },
                  error: function ( response ) {
                      var results = $.parseJSON( response );
                      console.log( results );
                      form.removeClass('loader');
                  }
              });
            } else {
                $('.error_message_register').text(res.message);
                check_user_error = true;
            }
        })
        .fail(function (jqXHR, textStatus, error) {
            showMessage(textStatus);
        });
    } else{
        var together_price = $('.popup_price_webinar').text(); 
        var form      = $(this),
            data      = form.serialize(),
            formData  = new FormData();
        formData.append('action', 'create_order');
        formData.append('together_price', together_price);
        formData.append('form', data);
        formData.append('nonce', form.find('#form-create-order-nonce').val());

        $.ajax( {
            type: "POST",
            url: ajax_security.ajax_url,
            data: formData,
            processData: false,
            contentType: false,
            success: function ( response ) {
                console.log(response);
                var results = $.parseJSON( response );
                console.log(results);
                if ( results.success ) {
                    form.trigger('reset');
                    if ( results.type == 'reservation' ) {
                        $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                        _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                    }
                    if ( results.type == 'payment' ) {
                        window.location.replace( results.url );
                    }
                } else {
                    $('.popup-content[data-rel="' + results.popup + '"]').find('.text').html( results.message );
                    _functions.openPopup('.popup-content[data-rel="' + results.popup + '"]');
                    console.log( results );
                }
            },
            error: function ( response ) {
                var results = $.parseJSON( response );
                console.log( results );
                form.removeClass('loader');
            }
        });
    }

});


jQuery(window).on( 'load', function() {
    if ( $('body').hasClass('page-template-courses') && ( $('.filter-list.categories input[type="checkbox"]:checked').length || $('.filter-list.months input[type="checkbox"]:checked').length ) ) {
        _functions.productFilters();
    }
} );



// add popup for cf7
document.addEventListener( 'wpcf7mailsent', function( event ) {
    if ( '406' == event.detail.contactFormId || '74' == event.detail.contactFormId) { 
        // open popup
        jQuery('.popup-content').removeClass('active');
        jQuery('.popup-wrapper, .popup-content[data-rel="thanks-popup-cf7"]').addClass('active');
        jQuery('html').addClass('overflow-hidden');
    }
}, false );

// categories mobile
$('.category-title').on('click', function () {
  $(this)
      .toggleClass('active')
      .closest('.categories-menu')
      .toggleClass('active');
});

$('.categories-list-item').on('click', function () {
  $(this)
      .closest('.categories-menu')
      .removeClass('active')
      .find('.category-title')
      .removeClass('active');
});



$('#user-edit-form').on('submit',function(e) {
  e.preventDefault();
  //    count = $('.cabinet_address tbody tr').length,
  var form = $(this);
  var data = form.serializeArray(),
      formData={};
  data.push({name:'action', value:'update_user'});
  //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
  data.map(function(x){formData[x.name] = x.value;});
  form.find('.btn').addClass('btn-disabled');
  $.post(ajax_security.ajax_url, formData)
      .done(function (response) {
          var res = parseJson(response);
          if (res.success) {
              $('.message_success').text(res.message);
              $('.error_message_register').text('');
          } else {
              $('.error_message_register').text(response);
              $('.message_success').text('');
          }
          form.find('.btn').removeClass('btn-disabled');
      })
      .fail(function (jqXHR, textStatus, error) {
          showMessage(textStatus, true);
      });
  return false;

});



$('#user-edit-password').on('submit',function() {
    var form = $(this);
    var data = form.serializeArray(),
        formData={};

    data.push({name:'action', value:'update_user_password'});
    //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
    data.map(function(x){formData[x.name] = x.value;});
    form.find('.btn').addClass('btn-disabled');
    $.post(ajax_security.ajax_url, formData)
        .done(function (response) {
            var res = parseJson(response);
            if (res.success) {
                $('.error_message_register').text('');
                _functions.openPopup('#congratulations__popup');
            } else {
                $('.error_message_register').text(response);
                $('.message_success').text('');
            }
            form.find('.btn').removeClass('btn-disabled');
        })
        .fail(function (jqXHR, textStatus, error) {
            showMessage(textStatus, true);
        });
    return false;

});


// document.addEventListener('contextmenu', event => event.preventDefault());
// $(document).keydown(function (event) {
//     if (event.keyCode == 123) { // Prevent F12
//         return false;
//     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
//         return false;
//     }
// });

});



