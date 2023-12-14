$(function() {
  'use strict';
  function toSvg(obj) {
    var $img = obj;
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
    }, 'xml');
  }

  function init() {
    jQuery('img.svg').each(function(i) {
      toSvg($(this));
    });
    jQuery('.select').each(function () {
      var select = jQuery(this),
        size = (select.data('size') !== undefined) ? select.data('size') : 4;
      select.selectpicker({
        style: 'select-control',
        size: size,
        liveSearchPlaceholder: 'Search here..',
        width: "100%",
      });
      // console.log(size);
  });
    setTimeout(func, 200);
      $("#wrap").addClass("load-page");
  }init();

  function func() {
    // Fixed Header
    var $header = $('header'),
        $windowH = $(window).height(),
        $pos = $header.outerHeight() + 40;
    function fixedHeader() {
      var $top = $(window).scrollTop();
      if ($top > 10) {
          $header.addClass('sticky');
      } else {
          $header.removeClass('sticky');
      }
    }
    fixedHeader();
    // Call Function
    $(window).scroll(function() {
      fixedHeader();
    });

    $('.burger-menu').click(function() {
      $('body').toggleClass('main-menu-open');
      $('.has-sub').removeClass('sub-open');
    })
    $('.has-sub').each(function(){
      var t = $(this),
          sb = t.find('ul');
      sb.addClass('sub-menu');
    });
    // $('.has-sub').each(function(){
    //   var t = $(this),
    //       sb = t.find('ul');
    //   sb.addClass('sub-menu');
    // });
    // $('.has-sub').click(function() {
    //   $(this).toggleClass('sm-opened');
    // });

    // $('.has-child').click(function() {
    //   $(this).toggleClass('sm-opened');
    // });

    $('.has-sub, .has-child').click(function(e){
      e.stopPropagation(); // added this
      $('.has-sub').removeClass('sm-opened');
      $(this).toggleClass('sm-opened');
    });

    $(document).on("click", function(event){
      var $trigger = $(".sm-opened");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $('.has-sub, .has-child').removeClass('sm-opened');
      }
    });



    $('.slider').each(function () {
      var t = $(this);
      t.addClass('owl-carousel');
        t.owlCarousel({
          navText: [],
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          items: 1,
          loop: true,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 6000,
          autoplaySpeed: 3000,
          smartSpeed: 2500
        });
    });
    function slickMobile() {
      $('.slick-mobile').each(function () {
        var w = $(window).width();
        var t = $(this);
        if(w < 500){
          t.addClass('owl-carousel');
          t.owlCarousel({
            navText: [],
            items: 1,
            loop: false,
            nav: false,
            dots: false,
            autoplay: false,
            stagePadding: 30,
            autoWidth: true
          });
        }
      });
    }slickMobile();
    function slidermobile() {
      var w = $(window).width(),
          slider = $('.slider-md');
      if (w < 999) {
          slider.addClass('owl-carousel').removeClass('ns');
          slider.each(function() {
              var t = $(this),
                  item = t.attr('data-items') ? t.attr('data-items') : 1,
                  navs = t.attr('data-nav') && t.attr('data-nav') == "no" ? false : true,
                  dot = navs ? false : true,
                  loops = t.attr('data-loop') && t.attr('data-loop') == "no" ? false : true,
                  itemtab = item > 3 ? 3 : item,
                  itemltab = item > 4 ? 4 : item;
              t.owlCarousel({
                  loop: false,
                  dots: true,
                  nav: false,
                  autoplay: false,
                  autoplayTimeout: 6000,
                  autoplaySpeed: 800,
                  autoHeight: true,
                  responsive: {
                      0: {
                          items: item
                      },
                      992: {
                          items: 3
                      },
                  }
              })
          })
          slider.on('changed.owl.carousel', function(e) {
              slider.trigger('stop.owl.autoplay');
              slider.trigger('play.owl.autoplay');
          });
      } else {
          slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
          slider.find('.owl-stage-outer').children().unwrap();
      }
    }
  slidermobile();



  $(".logo-grid").each(function() {
    var t = $(this)
      , e = t.closest(".logo-grid__container");
    e.marquee({
        duration: 25e3,
        startVisible: !0,
        duplicated: 1,
        gap: 0,
        pauseOnHover: !0
    })
  })

  $('.scrldown').each(function() {
    var target = $(this).data('target');
    $(this).click(function() {
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 600);
    })
  })
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('.sub-item__link')
  .not("[data-toggle='collapse']")
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      var hed = $('body').find('.main-menu');

      if($('.main-menu').length > 0){
        var hh = hed.height();
      }
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  // to top right away
  if ( window.location.hash ) scroll(0,0);
  // void some browsers issue
  setTimeout( function() { scroll(0,0); }, 1);

  $(function() {

    // your current click function
    $('.scroll').on('click', function(e) {
        var hed = $('body').find('.main-menu');
        if($('.main-menu').length > 0){
          var hh = hed.height();
        }
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - hh  + 'px'
        }, 1000);
    });

    // *only* if we have anchor on the url
    if(window.location.hash) {
        // smooth scroll to the anchor id
        var hed = $('body').find('.main-menu');
        if($('.main-menu').length > 0){
          var hh = hed.height();
        }
        setTimeout(function() {
          $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top - hh + 'px'
          }, 1000);
        }, 3000);
    }

  });

  // Countdown
  // Set the date we're counting down to


  // Update the count down every 1 second
  jQuery('#countdownCounter').each(function(){
    var dtadate = jQuery(this).data('date');
    var countDownDate = new Date(dtadate).getTime();
    if(dtadate != ""){
      var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdownCounter").innerHTML = "<div class='cd cd-days'> <b>" + days + "</b> <span>Days</span> </div> " + "<div class='cd cd-hour'> <b>" + hours + "</b> <span>Hours</span> </div>"+ "<div class='cd cd-min'> <b>" + minutes + "</b> <span>Minutes</span> </div>" + "<div class='cd cd-sec'> <b>" + seconds + "</b> <span>Seconds</span> </div>";

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdownCounter").innerHTML = "EXPIRED";
        }
      }, 1000);
    }
  })

  $('.text-ellipsis').each(function() {
    var $elem = $(this);
    var maxHeight = parseInt($elem.css('line-height'), 16) * 4; // Tinggi maksimum kontainer (3 baris)
    var text = $elem.text();
    var clone = $elem.clone().css({
      'height': 'auto',
      'width': $elem.width(),
      'overflow': 'hidden',
      'position': 'absolute',
      'top': '-9999px'
    }).text(text).appendTo('body');
    var height = clone.height();
    clone.remove();
    if (height > maxHeight) {
      var words = text.split(' ');
      var ellipsisText = '';
      for (var i = 0; i < words.length; i++) {
        var testText = ellipsisText + ' ' + words[i];
        clone = $elem.clone().css({
          'position': 'absolute',
          'top': '-9999px',
          'width': $elem.width()
        }).text(testText).appendTo('body');
        if (clone.height() > maxHeight) {
          $elem.text(ellipsisText + '...');
          break;
        }
        ellipsisText = testText;
        clone.remove();
      }
    }
  });

  function hashSmoothScroll() {
    $(".toc_sidebar a").on('click', function (event) {

      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;
        console.log(hash);

        $('html, body').animate({
          scrollTop: $(hash).offset().top - 70  + 'px'
        }, 1000, function () {
          // window.location.hash = hash;
        });
      }
    });
  }
  hashSmoothScroll();

  // Select Mobile
  $('.toc_sidebar').each(function(){
    var t = $(this),
        a = t.find('.sub-item__link'),
        aa = t.find('li:first-child .sub-item__link'),
        select = $('<div class="dropdown-menu nav">'),
        toggle = $("<button class='btn btn-border btn-block dropdown-toggle' data-toggle='dropdown'>"+aa.html()+"</button>"),
        st = $("<div class='dropdown dropdown-nav' />");

    a.each(function(){
        var c = $(this).clone()
        c.addClass('dropdown-nav-item')
        select.append(c)

        c.on('click',function(e){
            // toggle.text(e.target.innerText)
            toggle.html($(e.target).html());
        })
    })
    st.append(toggle);
    st.append(select);
    st.insertAfter(t);

    $(a).on('show.bs.tab',function(e){
        var t = e.target.innerText
        toggle.html(t)
        select.find(".dropdown-nav-item:contains("+t+")").addClass('active').siblings().removeClass('active')
        toggle.html($(this).html());
    })


  });

  // Sticky
  var $sticky = $('.stickysidebar');
  var $stickyrStopper = $('.sticky-stopper');
  if (!!$sticky.offset()) { // make sure ".sticky" element exists

    var generalSidebarHeight = $sticky.innerHeight();
    var stickyTop = $sticky.offset().top;
    var stickOffset = 80;
    var stickyStopperPosition = $stickyrStopper.offset().top;
    var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    var diff = stopPoint + stickOffset;
    var position = $(window).scrollTop();

    $(window).scroll(function(){ // scroll event
      var windowTop = $(window).scrollTop(); // returns number
      var scroll = $(window).scrollTop(); // returns number

      if (stopPoint < windowTop) {
          // $sticky.css({ position: 'absolute', top: diff });
          $sticky.css({ position: 'absolute', top: 'initial', bottom: 0 });
      } else if (stickyTop < windowTop+stickOffset) {
        if(scroll < position){
          $sticky.css({ position: 'fixed', top: stickOffset + 40, bottom: 'initial' });
        }else{
          $sticky.css({ position: 'fixed', top: stickOffset, bottom: 'initial' });
        }

      } else {
          $sticky.css({position: 'absolute', top: 'initial'});
      }

      // if (scroll < position){
      //   $sticky.css({ position: 'fixed', top: stickOffset + 120, bottom: 'initial' });
      // }

      position = scroll;
    });

  }

  };
});