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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG4gIGZ1bmN0aW9uIHRvU3ZnKG9iaikge1xyXG4gICAgdmFyICRpbWcgPSBvYmo7XHJcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICB9LCAneG1sJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHRvU3ZnKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICBqUXVlcnkoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdCA9IGpRdWVyeSh0aGlzKSxcclxuICAgICAgICBzaXplID0gKHNlbGVjdC5kYXRhKCdzaXplJykgIT09IHVuZGVmaW5lZCkgPyBzZWxlY3QuZGF0YSgnc2l6ZScpIDogNDtcclxuICAgICAgc2VsZWN0LnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgc2l6ZTogc2l6ZSxcclxuICAgICAgICBsaXZlU2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2ggaGVyZS4uJyxcclxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhzaXplKTtcclxuICB9KTtcclxuICAgIHNldFRpbWVvdXQoZnVuYywgMjAwKTtcclxuICAgICAgJChcIiN3cmFwXCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gIH1pbml0KCk7XHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcbiAgICAvLyBGaXhlZCBIZWFkZXJcclxuICAgIHZhciAkaGVhZGVyID0gJCgnaGVhZGVyJyksXHJcbiAgICAgICAgJHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgJHBvcyA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKSArIDQwO1xyXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XHJcbiAgICAgIHZhciAkdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBpZiAoJHRvcCA+IDEwKSB7XHJcbiAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaXhlZEhlYWRlcigpO1xyXG4gICAgLy8gQ2FsbCBGdW5jdGlvblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgZml4ZWRIZWFkZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5idXJnZXItbWVudScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21haW4tbWVudS1vcGVuJyk7XHJcbiAgICAgICQoJy5oYXMtc3ViJykucmVtb3ZlQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICB9KVxyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgIC8vICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgLy8gICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAkKCcuaGFzLWNoaWxkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gYWRkZWQgdGhpc1xyXG4gICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgdmFyICR0cmlnZ2VyID0gJChcIi5zbS1vcGVuZWRcIik7XHJcbiAgICAgIGlmKCR0cmlnZ2VyICE9PSBldmVudC50YXJnZXQgJiYgISR0cmlnZ2VyLmhhcyhldmVudC50YXJnZXQpLmxlbmd0aCl7XHJcbiAgICAgICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5yZW1vdmVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJCgnLnNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgbmF2VGV4dDogW10sXHJcbiAgICAgICAgICBhbmltYXRlT3V0OiAnZmFkZU91dCcsXHJcbiAgICAgICAgICBhbmltYXRlSW46ICdmYWRlSW4nLFxyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICAgIHNtYXJ0U3BlZWQ6IDI1MDBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gc2xpY2tNb2JpbGUoKSB7XHJcbiAgICAgICQoJy5zbGljay1tb2JpbGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgICBpZih3IDwgNTAwKXtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIG5hdlRleHQ6IFtdLFxyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogMzAsXHJcbiAgICAgICAgICAgIGF1dG9XaWR0aDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1zbGlja01vYmlsZSgpO1xyXG4gICAgZnVuY3Rpb24gc2xpZGVybW9iaWxlKCkge1xyXG4gICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgc2xpZGVyID0gJCgnLnNsaWRlci1tZCcpO1xyXG4gICAgICBpZiAodyA8IDk5OSkge1xyXG4gICAgICAgICAgc2xpZGVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnbnMnKTtcclxuICAgICAgICAgIHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgaXRlbSA9IHQuYXR0cignZGF0YS1pdGVtcycpID8gdC5hdHRyKCdkYXRhLWl0ZW1zJykgOiAxLFxyXG4gICAgICAgICAgICAgICAgICBuYXZzID0gdC5hdHRyKCdkYXRhLW5hdicpICYmIHQuYXR0cignZGF0YS1uYXYnKSA9PSBcIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIGRvdCA9IG5hdnMgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIGxvb3BzID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpID09IFwibm9cIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgaXRlbXRhYiA9IGl0ZW0gPiAzID8gMyA6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW1sdGFiID0gaXRlbSA+IDQgPyA0IDogaXRlbTtcclxuICAgICAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdzdG9wLm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdwbGF5Lm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIHNsaWRlcm1vYmlsZSgpO1xyXG5cclxuXHJcblxyXG4gICQoXCIubG9nby1ncmlkXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdCA9ICQodGhpcylcclxuICAgICAgLCBlID0gdC5jbG9zZXN0KFwiLmxvZ28tZ3JpZF9fY29udGFpbmVyXCIpO1xyXG4gICAgZS5tYXJxdWVlKHtcclxuICAgICAgICBkdXJhdGlvbjogMjVlMyxcclxuICAgICAgICBzdGFydFZpc2libGU6ICEwLFxyXG4gICAgICAgIGR1cGxpY2F0ZWQ6IDEsXHJcbiAgICAgICAgZ2FwOiAwLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogITBcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgJCgnLnNjcmxkb3duJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcFxyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIC8vIFNlbGVjdCBhbGwgbGlua3Mgd2l0aCBoYXNoZXNcclxuICAkKCdhW2hyZWYqPVwiI1wiXScpXHJcbiAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xyXG4gIC5ub3QoJ1tocmVmPVwiI1wiXScpXHJcbiAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXHJcbiAgLm5vdCgnLnN1Yi1pdGVtX19saW5rJylcclxuICAubm90KFwiW2RhdGEtdG9nZ2xlPSdjb2xsYXBzZSddXCIpXHJcbiAgLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBPbi1wYWdlIGxpbmtzXHJcbiAgICBpZiAoXHJcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmXHJcbiAgICAgIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWVcclxuICAgICkge1xyXG4gICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG5cclxuICAgICAgaWYoJCgnLm1haW4tbWVudScpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIHZhciBoaCA9IGhlZC5oZWlnaHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XHJcbiAgICAgIC8vIERvZXMgYSBzY3JvbGwgdGFyZ2V0IGV4aXN0P1xyXG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIC8vIE9ubHkgcHJldmVudCBkZWZhdWx0IGlmIGFuaW1hdGlvbiBpcyBhY3R1YWxseSBnb25uYSBoYXBwZW5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXHJcbiAgICAgICAgICAvLyBNdXN0IGNoYW5nZSBmb2N1cyFcclxuICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xyXG4gICAgICAgICAgJHRhcmdldC5mb2N1cygpO1xyXG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoXCI6Zm9jdXNcIikpIHsgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCB3YXMgZm9jdXNlZFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7IC8vIEFkZGluZyB0YWJpbmRleCBmb3IgZWxlbWVudHMgbm90IGZvY3VzYWJsZVxyXG4gICAgICAgICAgICAkdGFyZ2V0LmZvY3VzKCk7IC8vIFNldCBmb2N1cyBhZ2FpblxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyB0byB0b3AgcmlnaHQgYXdheVxyXG4gIGlmICggd2luZG93LmxvY2F0aW9uLmhhc2ggKSBzY3JvbGwoMCwwKTtcclxuICAvLyB2b2lkIHNvbWUgYnJvd3NlcnMgaXNzdWVcclxuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHsgc2Nyb2xsKDAsMCk7IH0sIDEpO1xyXG5cclxuICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIHlvdXIgY3VycmVudCBjbGljayBmdW5jdGlvblxyXG4gICAgJCgnLnNjcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgaGVkID0gJCgnYm9keScpLmZpbmQoJy5tYWluLW1lbnUnKTtcclxuICAgICAgICBpZigkKCcubWFpbi1tZW51JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB2YXIgaGggPSBoZWQuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gaGggICsgJ3B4J1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gKm9ubHkqIGlmIHdlIGhhdmUgYW5jaG9yIG9uIHRoZSB1cmxcclxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgLy8gc21vb3RoIHNjcm9sbCB0byB0aGUgYW5jaG9yIGlkXHJcbiAgICAgICAgdmFyIGhlZCA9ICQoJ2JvZHknKS5maW5kKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgaWYoJCgnLm1haW4tbWVudScpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgdmFyIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQod2luZG93LmxvY2F0aW9uLmhhc2gpLm9mZnNldCgpLnRvcCAtIGhoICsgJ3B4J1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyBDb3VudGRvd25cclxuICAvLyBTZXQgdGhlIGRhdGUgd2UncmUgY291bnRpbmcgZG93biB0b1xyXG5cclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBjb3VudCBkb3duIGV2ZXJ5IDEgc2Vjb25kXHJcbiAgalF1ZXJ5KCcjY291bnRkb3duQ291bnRlcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciBkdGFkYXRlID0galF1ZXJ5KHRoaXMpLmRhdGEoJ2RhdGUnKTtcclxuICAgIHZhciBjb3VudERvd25EYXRlID0gbmV3IERhdGUoZHRhZGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgaWYoZHRhZGF0ZSAhPSBcIlwiKXtcclxuICAgICAgdmFyIHggPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBHZXQgdG9kYXkncyBkYXRlIGFuZCB0aW1lXHJcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIG5vdyBhbmQgdGhlIGNvdW50IGRvd24gZGF0ZVxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XHJcblxyXG4gICAgICAgIC8vIFRpbWUgY2FsY3VsYXRpb25zIGZvciBkYXlzLCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kc1xyXG4gICAgICAgIHZhciBkYXlzID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcbiAgICAgICAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xyXG4gICAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGxheSB0aGUgcmVzdWx0IGluIHRoZSBlbGVtZW50IHdpdGggaWQ9XCJkZW1vXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZG93bkNvdW50ZXJcIikuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdjZCBjZC1kYXlzJz4gPGI+XCIgKyBkYXlzICsgXCI8L2I+IDxzcGFuPkRheXM8L3NwYW4+IDwvZGl2PiBcIiArIFwiPGRpdiBjbGFzcz0nY2QgY2QtaG91cic+IDxiPlwiICsgaG91cnMgKyBcIjwvYj4gPHNwYW4+SG91cnM8L3NwYW4+IDwvZGl2PlwiKyBcIjxkaXYgY2xhc3M9J2NkIGNkLW1pbic+IDxiPlwiICsgbWludXRlcyArIFwiPC9iPiA8c3Bhbj5NaW51dGVzPC9zcGFuPiA8L2Rpdj5cIiArIFwiPGRpdiBjbGFzcz0nY2QgY2Qtc2VjJz4gPGI+XCIgKyBzZWNvbmRzICsgXCI8L2I+IDxzcGFuPlNlY29uZHM8L3NwYW4+IDwvZGl2PlwiO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY291bnQgZG93biBpcyBmaW5pc2hlZCwgd3JpdGUgc29tZSB0ZXh0XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCkge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh4KTtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRkb3duQ291bnRlclwiKS5pbm5lckhUTUwgPSBcIkVYUElSRURcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gICQoJy50ZXh0LWVsbGlwc2lzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciAkZWxlbSA9ICQodGhpcyk7XHJcbiAgICB2YXIgbWF4SGVpZ2h0ID0gcGFyc2VJbnQoJGVsZW0uY3NzKCdsaW5lLWhlaWdodCcpLCAxNikgKiA0OyAvLyBUaW5nZ2kgbWFrc2ltdW0ga29udGFpbmVyICgzIGJhcmlzKVxyXG4gICAgdmFyIHRleHQgPSAkZWxlbS50ZXh0KCk7XHJcbiAgICB2YXIgY2xvbmUgPSAkZWxlbS5jbG9uZSgpLmNzcyh7XHJcbiAgICAgICdoZWlnaHQnOiAnYXV0bycsXHJcbiAgICAgICd3aWR0aCc6ICRlbGVtLndpZHRoKCksXHJcbiAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxyXG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAndG9wJzogJy05OTk5cHgnXHJcbiAgICB9KS50ZXh0KHRleHQpLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICB2YXIgaGVpZ2h0ID0gY2xvbmUuaGVpZ2h0KCk7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIGlmIChoZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdCgnICcpO1xyXG4gICAgICB2YXIgZWxsaXBzaXNUZXh0ID0gJyc7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVzdFRleHQgPSBlbGxpcHNpc1RleHQgKyAnICcgKyB3b3Jkc1tpXTtcclxuICAgICAgICBjbG9uZSA9ICRlbGVtLmNsb25lKCkuY3NzKHtcclxuICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAndG9wJzogJy05OTk5cHgnLFxyXG4gICAgICAgICAgJ3dpZHRoJzogJGVsZW0ud2lkdGgoKVxyXG4gICAgICAgIH0pLnRleHQodGVzdFRleHQpLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgaWYgKGNsb25lLmhlaWdodCgpID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAkZWxlbS50ZXh0KGVsbGlwc2lzVGV4dCArICcuLi4nKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGxpcHNpc1RleHQgPSB0ZXN0VGV4dDtcclxuICAgICAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBoYXNoU21vb3RoU2Nyb2xsKCkge1xyXG4gICAgJChcIi50b2Nfc2lkZWJhciBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGFzaCAhPT0gXCJcIikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciBoYXNoID0gdGhpcy5oYXNoO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhhc2gpO1xyXG5cclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6ICQoaGFzaCkub2Zmc2V0KCkudG9wIC0gNzAgICsgJ3B4J1xyXG4gICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGhhc2hTbW9vdGhTY3JvbGwoKTtcclxuXHJcbiAgLy8gU2VsZWN0IE1vYmlsZVxyXG4gICQoJy50b2Nfc2lkZWJhcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBhID0gdC5maW5kKCcuc3ViLWl0ZW1fX2xpbmsnKSxcclxuICAgICAgICBhYSA9IHQuZmluZCgnbGk6Zmlyc3QtY2hpbGQgLnN1Yi1pdGVtX19saW5rJyksXHJcbiAgICAgICAgc2VsZWN0ID0gJCgnPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgbmF2XCI+JyksXHJcbiAgICAgICAgdG9nZ2xlID0gJChcIjxidXR0b24gY2xhc3M9J2J0biBidG4tYm9yZGVyIGJ0bi1ibG9jayBkcm9wZG93bi10b2dnbGUnIGRhdGEtdG9nZ2xlPSdkcm9wZG93bic+XCIrYWEuaHRtbCgpK1wiPC9idXR0b24+XCIpLFxyXG4gICAgICAgIHN0ID0gJChcIjxkaXYgY2xhc3M9J2Ryb3Bkb3duIGRyb3Bkb3duLW5hdicgLz5cIik7XHJcblxyXG4gICAgYS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGMgPSAkKHRoaXMpLmNsb25lKClcclxuICAgICAgICBjLmFkZENsYXNzKCdkcm9wZG93bi1uYXYtaXRlbScpXHJcbiAgICAgICAgc2VsZWN0LmFwcGVuZChjKVxyXG5cclxuICAgICAgICBjLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZS50ZXh0KGUudGFyZ2V0LmlubmVyVGV4dClcclxuICAgICAgICAgICAgdG9nZ2xlLmh0bWwoJChlLnRhcmdldCkuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIHN0LmFwcGVuZCh0b2dnbGUpO1xyXG4gICAgc3QuYXBwZW5kKHNlbGVjdCk7XHJcbiAgICBzdC5pbnNlcnRBZnRlcih0KTtcclxuXHJcbiAgICAkKGEpLm9uKCdzaG93LmJzLnRhYicsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIHQgPSBlLnRhcmdldC5pbm5lclRleHRcclxuICAgICAgICB0b2dnbGUuaHRtbCh0KVxyXG4gICAgICAgIHNlbGVjdC5maW5kKFwiLmRyb3Bkb3duLW5hdi1pdGVtOmNvbnRhaW5zKFwiK3QrXCIpXCIpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgIHRvZ2dsZS5odG1sKCQodGhpcykuaHRtbCgpKTtcclxuICAgIH0pXHJcblxyXG5cclxuICB9KTtcclxuXHJcbiAgLy8gU3RpY2t5XHJcbiAgdmFyICRzdGlja3kgPSAkKCcuc3RpY2t5c2lkZWJhcicpO1xyXG4gIHZhciAkc3RpY2t5clN0b3BwZXIgPSAkKCcuc3RpY2t5LXN0b3BwZXInKTtcclxuICBpZiAoISEkc3RpY2t5Lm9mZnNldCgpKSB7IC8vIG1ha2Ugc3VyZSBcIi5zdGlja3lcIiBlbGVtZW50IGV4aXN0c1xyXG5cclxuICAgIHZhciBnZW5lcmFsU2lkZWJhckhlaWdodCA9ICRzdGlja3kuaW5uZXJIZWlnaHQoKTtcclxuICAgIHZhciBzdGlja3lUb3AgPSAkc3RpY2t5Lm9mZnNldCgpLnRvcDtcclxuICAgIHZhciBzdGlja09mZnNldCA9IDgwO1xyXG4gICAgdmFyIHN0aWNreVN0b3BwZXJQb3NpdGlvbiA9ICRzdGlja3lyU3RvcHBlci5vZmZzZXQoKS50b3A7XHJcbiAgICB2YXIgc3RvcFBvaW50ID0gc3RpY2t5U3RvcHBlclBvc2l0aW9uIC0gZ2VuZXJhbFNpZGViYXJIZWlnaHQgLSBzdGlja09mZnNldDtcclxuICAgIHZhciBkaWZmID0gc3RvcFBvaW50ICsgc3RpY2tPZmZzZXQ7XHJcbiAgICB2YXIgcG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpeyAvLyBzY3JvbGwgZXZlbnRcclxuICAgICAgdmFyIHdpbmRvd1RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gcmV0dXJucyBudW1iZXJcclxuICAgICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gcmV0dXJucyBudW1iZXJcclxuXHJcbiAgICAgIGlmIChzdG9wUG9pbnQgPCB3aW5kb3dUb3ApIHtcclxuICAgICAgICAgIC8vICRzdGlja3kuY3NzKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogZGlmZiB9KTtcclxuICAgICAgICAgICRzdGlja3kuY3NzKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2luaXRpYWwnLCBib3R0b206IDAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RpY2t5VG9wIDwgd2luZG93VG9wK3N0aWNrT2Zmc2V0KSB7XHJcbiAgICAgICAgaWYoc2Nyb2xsIDwgcG9zaXRpb24pe1xyXG4gICAgICAgICAgJHN0aWNreS5jc3MoeyBwb3NpdGlvbjogJ2ZpeGVkJywgdG9wOiBzdGlja09mZnNldCArIDQwLCBib3R0b206ICdpbml0aWFsJyB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICRzdGlja3kuY3NzKHsgcG9zaXRpb246ICdmaXhlZCcsIHRvcDogc3RpY2tPZmZzZXQsIGJvdHRvbTogJ2luaXRpYWwnIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkc3RpY2t5LmNzcyh7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2luaXRpYWwnfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIChzY3JvbGwgPCBwb3NpdGlvbil7XHJcbiAgICAgIC8vICAgJHN0aWNreS5jc3MoeyBwb3NpdGlvbjogJ2ZpeGVkJywgdG9wOiBzdGlja09mZnNldCArIDEyMCwgYm90dG9tOiAnaW5pdGlhbCcgfSk7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgIHBvc2l0aW9uID0gc2Nyb2xsO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgfTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
