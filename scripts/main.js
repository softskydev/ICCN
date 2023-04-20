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
    $('.has-child').each(function(){
      var t = $(this),
          sb = t.find('ul');
      sb.addClass('sub-menu');
    });
    $('.has-sub').each(function(){
      var t = $(this),
          sb = t.find('ul');
      sb.addClass('sub-menu');
    });
    // $('.has-sub').click(function() {
    //   $(this).toggleClass('sm-opened');
    // });

    // $('.has-child').click(function() {
    //   $(this).toggleClass('sm-opened');
    // });

    $('.has-sub, .has-child').click(function(e){
      e.stopPropagation(); // added this
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
      if (w < 760) {
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
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      var hed = $('body').find('.main-menu');
          hh = hed.height();
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
        hh = hed.height();
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - hh  + 'px'
        }, 1000);
    });

    // *only* if we have anchor on the url
    if(window.location.hash) {
        // smooth scroll to the anchor id
        var hed = $('body').find('.main-menu');
            hh = hed.height();
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

  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG4gIGZ1bmN0aW9uIHRvU3ZnKG9iaikge1xyXG4gICAgdmFyICRpbWcgPSBvYmo7XHJcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICB9LCAneG1sJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHRvU3ZnKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDIwMCk7XHJcbiAgICAgICQoXCIjd3JhcFwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgLy8gRml4ZWQgSGVhZGVyXHJcbiAgICB2YXIgJGhlYWRlciA9ICQoJ2hlYWRlcicpLFxyXG4gICAgICAgICR3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICRwb3MgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCkgKyA0MDtcclxuICAgIGZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgICB2YXIgJHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKCR0b3AgPiAxMCkge1xyXG4gICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZml4ZWRIZWFkZXIoKTtcclxuICAgIC8vIENhbGwgRnVuY3Rpb25cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZpeGVkSGVhZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYnVyZ2VyLW1lbnUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWluLW1lbnUtb3BlbicpO1xyXG4gICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgfSlcclxuICAgICQoJy5oYXMtY2hpbGQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAkKCcuaGFzLWNoaWxkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gYWRkZWQgdGhpc1xyXG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICB2YXIgJHRyaWdnZXIgPSAkKFwiLnNtLW9wZW5lZFwiKTtcclxuICAgICAgaWYoJHRyaWdnZXIgIT09IGV2ZW50LnRhcmdldCAmJiAhJHRyaWdnZXIuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKXtcclxuICAgICAgICAkKCcuaGFzLXN1YiwgLmhhcy1jaGlsZCcpLnJlbW92ZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBuYXZUZXh0OiBbXSxcclxuICAgICAgICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0JyxcclxuICAgICAgICAgIGFuaW1hdGVJbjogJ2ZhZGVJbicsXHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxyXG4gICAgICAgICAgc21hcnRTcGVlZDogMjUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBzbGlja01vYmlsZSgpIHtcclxuICAgICAgJCgnLnNsaWNrLW1vYmlsZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmKHcgPCA1MDApe1xyXG4gICAgICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbmF2VGV4dDogW10sXHJcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiAzMCxcclxuICAgICAgICAgICAgYXV0b1dpZHRoOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfXNsaWNrTW9iaWxlKCk7XHJcbiAgICBmdW5jdGlvbiBzbGlkZXJtb2JpbGUoKSB7XHJcbiAgICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICAgICBzbGlkZXIgPSAkKCcuc2xpZGVyLW1kJyk7XHJcbiAgICAgIGlmICh3IDwgNzYwKSB7XHJcbiAgICAgICAgICBzbGlkZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCducycpO1xyXG4gICAgICAgICAgc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICBpdGVtID0gdC5hdHRyKCdkYXRhLWl0ZW1zJykgPyB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIG5hdnMgPSB0LmF0dHIoJ2RhdGEtbmF2JykgJiYgdC5hdHRyKCdkYXRhLW5hdicpID09IFwibm9cIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgZG90ID0gbmF2cyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgbG9vcHMgPSB0LmF0dHIoJ2RhdGEtbG9vcCcpICYmIHQuYXR0cignZGF0YS1sb29wJykgPT0gXCJub1wiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBpdGVtdGFiID0gaXRlbSA+IDMgPyAzIDogaXRlbSxcclxuICAgICAgICAgICAgICAgICAgaXRlbWx0YWIgPSBpdGVtID4gNCA/IDQgOiBpdGVtO1xyXG4gICAgICAgICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ3N0b3Aub3dsLmF1dG9wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ3BsYXkub3dsLmF1dG9wbGF5Jyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICAgc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgc2xpZGVybW9iaWxlKCk7XHJcblxyXG5cclxuXHJcbiAgJChcIi5sb2dvLWdyaWRcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciB0ID0gJCh0aGlzKVxyXG4gICAgICAsIGUgPSB0LmNsb3Nlc3QoXCIubG9nby1ncmlkX19jb250YWluZXJcIik7XHJcbiAgICBlLm1hcnF1ZWUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiAyNWUzLFxyXG4gICAgICAgIHN0YXJ0VmlzaWJsZTogITAsXHJcbiAgICAgICAgZHVwbGljYXRlZDogMSxcclxuICAgICAgICBnYXA6IDAsXHJcbiAgICAgICAgcGF1c2VPbkhvdmVyOiAhMFxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAkKCcuc2NybGRvd24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XHJcbiAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiAkKHRhcmdldCkub2Zmc2V0KCkudG9wXHJcbiAgICAgIH0sIDYwMCk7XHJcbiAgICB9KVxyXG4gIH0pXHJcbiAgLy8gU2VsZWN0IGFsbCBsaW5rcyB3aXRoIGhhc2hlc1xyXG4gICQoJ2FbaHJlZio9XCIjXCJdJylcclxuICAvLyBSZW1vdmUgbGlua3MgdGhhdCBkb24ndCBhY3R1YWxseSBsaW5rIHRvIGFueXRoaW5nXHJcbiAgLm5vdCgnW2hyZWY9XCIjXCJdJylcclxuICAubm90KCdbaHJlZj1cIiMwXCJdJylcclxuICAuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vIE9uLXBhZ2UgbGlua3NcclxuICAgIGlmIChcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgJiZcclxuICAgICAgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIEZpZ3VyZSBvdXQgZWxlbWVudCB0byBzY3JvbGwgdG9cclxuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgdmFyIGhlZCA9ICQoJ2JvZHknKS5maW5kKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgICBoaCA9IGhlZC5oZWlnaHQoKTtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyAnXScpO1xyXG4gICAgICAvLyBEb2VzIGEgc2Nyb2xsIHRhcmdldCBleGlzdD9cclxuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAvLyBPbmx5IHByZXZlbnQgZGVmYXVsdCBpZiBhbmltYXRpb24gaXMgYWN0dWFsbHkgZ29ubmEgaGFwcGVuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcclxuICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIENhbGxiYWNrIGFmdGVyIGFuaW1hdGlvblxyXG4gICAgICAgICAgLy8gTXVzdCBjaGFuZ2UgZm9jdXMhXHJcbiAgICAgICAgICB2YXIgJHRhcmdldCA9ICQodGFyZ2V0KTtcclxuICAgICAgICAgICR0YXJnZXQuZm9jdXMoKTtcclxuICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKFwiOmZvY3VzXCIpKSB7IC8vIENoZWNraW5nIGlmIHRoZSB0YXJnZXQgd2FzIGZvY3VzZWRcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpOyAvLyBBZGRpbmcgdGFiaW5kZXggZm9yIGVsZW1lbnRzIG5vdCBmb2N1c2FibGVcclxuICAgICAgICAgICAgJHRhcmdldC5mb2N1cygpOyAvLyBTZXQgZm9jdXMgYWdhaW5cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gdG8gdG9wIHJpZ2h0IGF3YXlcclxuICBpZiAoIHdpbmRvdy5sb2NhdGlvbi5oYXNoICkgc2Nyb2xsKDAsMCk7XHJcbiAgLy8gdm9pZCBzb21lIGJyb3dzZXJzIGlzc3VlXHJcbiAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7IHNjcm9sbCgwLDApOyB9LCAxKTtcclxuXHJcbiAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyB5b3VyIGN1cnJlbnQgY2xpY2sgZnVuY3Rpb25cclxuICAgICQoJy5zY3JvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGhlZCA9ICQoJ2JvZHknKS5maW5kKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgaGggPSBoZWQuaGVpZ2h0KCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3AgLSBoaCAgKyAncHgnXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAqb25seSogaWYgd2UgaGF2ZSBhbmNob3Igb24gdGhlIHVybFxyXG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAvLyBzbW9vdGggc2Nyb2xsIHRvIHRoZSBhbmNob3IgaWRcclxuICAgICAgICB2YXIgaGVkID0gJCgnYm9keScpLmZpbmQoJy5tYWluLW1lbnUnKTtcclxuICAgICAgICAgICAgaGggPSBoZWQuaGVpZ2h0KCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKHdpbmRvdy5sb2NhdGlvbi5oYXNoKS5vZmZzZXQoKS50b3AgLSBoaCArICdweCdcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbiAgLy8gQ291bnRkb3duXHJcbiAgLy8gU2V0IHRoZSBkYXRlIHdlJ3JlIGNvdW50aW5nIGRvd24gdG9cclxuXHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgY291bnQgZG93biBldmVyeSAxIHNlY29uZFxyXG4gIGpRdWVyeSgnI2NvdW50ZG93bkNvdW50ZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZHRhZGF0ZSA9IGpRdWVyeSh0aGlzKS5kYXRhKCdkYXRlJyk7XHJcbiAgICB2YXIgY291bnREb3duRGF0ZSA9IG5ldyBEYXRlKGR0YWRhdGUpLmdldFRpbWUoKTtcclxuICAgIGlmKGR0YWRhdGUgIT0gXCJcIil7XHJcbiAgICAgIHZhciB4ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gR2V0IHRvZGF5J3MgZGF0ZSBhbmQgdGltZVxyXG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBub3cgYW5kIHRoZSBjb3VudCBkb3duIGRhdGVcclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBjb3VudERvd25EYXRlIC0gbm93O1xyXG5cclxuICAgICAgICAvLyBUaW1lIGNhbGN1bGF0aW9ucyBmb3IgZGF5cywgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHNcclxuICAgICAgICB2YXIgZGF5cyA9IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG4gICAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCkpIC8gMTAwMCk7XHJcblxyXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIHJlc3VsdCBpbiB0aGUgZWxlbWVudCB3aXRoIGlkPVwiZGVtb1wiXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGRvd25Db3VudGVyXCIpLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nY2QgY2QtZGF5cyc+IDxiPlwiICsgZGF5cyArIFwiPC9iPiA8c3Bhbj5EYXlzPC9zcGFuPiA8L2Rpdj4gXCIgKyBcIjxkaXYgY2xhc3M9J2NkIGNkLWhvdXInPiA8Yj5cIiArIGhvdXJzICsgXCI8L2I+IDxzcGFuPkhvdXJzPC9zcGFuPiA8L2Rpdj5cIisgXCI8ZGl2IGNsYXNzPSdjZCBjZC1taW4nPiA8Yj5cIiArIG1pbnV0ZXMgKyBcIjwvYj4gPHNwYW4+TWludXRlczwvc3Bhbj4gPC9kaXY+XCIgKyBcIjxkaXYgY2xhc3M9J2NkIGNkLXNlYyc+IDxiPlwiICsgc2Vjb25kcyArIFwiPC9iPiA8c3Bhbj5TZWNvbmRzPC9zcGFuPiA8L2Rpdj5cIjtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNvdW50IGRvd24gaXMgZmluaXNoZWQsIHdyaXRlIHNvbWUgdGV4dFxyXG4gICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoeCk7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZG93bkNvdW50ZXJcIikuaW5uZXJIVE1MID0gXCJFWFBJUkVEXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAkKCcudGV4dC1lbGxpcHNpcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgJGVsZW0gPSAkKHRoaXMpO1xyXG4gICAgdmFyIG1heEhlaWdodCA9IHBhcnNlSW50KCRlbGVtLmNzcygnbGluZS1oZWlnaHQnKSwgMTYpICogNDsgLy8gVGluZ2dpIG1ha3NpbXVtIGtvbnRhaW5lciAoMyBiYXJpcylcclxuICAgIHZhciB0ZXh0ID0gJGVsZW0udGV4dCgpO1xyXG4gICAgdmFyIGNsb25lID0gJGVsZW0uY2xvbmUoKS5jc3Moe1xyXG4gICAgICAnaGVpZ2h0JzogJ2F1dG8nLFxyXG4gICAgICAnd2lkdGgnOiAkZWxlbS53aWR0aCgpLFxyXG4gICAgICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcclxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgJ3RvcCc6ICctOTk5OXB4J1xyXG4gICAgfSkudGV4dCh0ZXh0KS5hcHBlbmRUbygnYm9keScpO1xyXG4gICAgdmFyIGhlaWdodCA9IGNsb25lLmhlaWdodCgpO1xyXG4gICAgY2xvbmUucmVtb3ZlKCk7XHJcbiAgICBpZiAoaGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoJyAnKTtcclxuICAgICAgdmFyIGVsbGlwc2lzVGV4dCA9ICcnO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlc3RUZXh0ID0gZWxsaXBzaXNUZXh0ICsgJyAnICsgd29yZHNbaV07XHJcbiAgICAgICAgY2xvbmUgPSAkZWxlbS5jbG9uZSgpLmNzcyh7XHJcbiAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgJ3RvcCc6ICctOTk5OXB4JyxcclxuICAgICAgICAgICd3aWR0aCc6ICRlbGVtLndpZHRoKClcclxuICAgICAgICB9KS50ZXh0KHRlc3RUZXh0KS5hcHBlbmRUbygnYm9keScpO1xyXG4gICAgICAgIGlmIChjbG9uZS5oZWlnaHQoKSA+IG1heEhlaWdodCkge1xyXG4gICAgICAgICAgJGVsZW0udGV4dChlbGxpcHNpc1RleHQgKyAnLi4uJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxsaXBzaXNUZXh0ID0gdGVzdFRleHQ7XHJcbiAgICAgICAgY2xvbmUucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgfTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
