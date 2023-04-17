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
    function priceMobile() {
      $('.price-mobile').each(function () {
        var w = $(window).width();
        var t = $(this);
        if(w < 500){
          t.addClass('owl-carousel').removeClass('row');
          t.owlCarousel({
            navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            items: 3,
            loop: true,
            nav: false,
            dots: false,
            autoplay: false,
            stagePadding: 10,
            autoWidth: true,
            // margin: 16,
            center: true
          });
        }
      });
    }priceMobile();
    $(window).scroll(function() {
      slickMobile();
      priceMobile();
  });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG4gIGZ1bmN0aW9uIHRvU3ZnKG9iaikge1xyXG4gICAgdmFyICRpbWcgPSBvYmo7XHJcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICB9LCAneG1sJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHRvU3ZnKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDIwMCk7XHJcbiAgICAgICQoXCIjd3JhcFwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgLy8gRml4ZWQgSGVhZGVyXHJcbiAgICB2YXIgJGhlYWRlciA9ICQoJ2hlYWRlcicpLFxyXG4gICAgICAgICR3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICRwb3MgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCkgKyA0MDtcclxuICAgIGZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgICB2YXIgJHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKCR0b3AgPiAxMCkge1xyXG4gICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZml4ZWRIZWFkZXIoKTtcclxuICAgIC8vIENhbGwgRnVuY3Rpb25cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZpeGVkSGVhZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYnVyZ2VyLW1lbnUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWluLW1lbnUtb3BlbicpO1xyXG4gICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgfSlcclxuICAgICQoJy5oYXMtY2hpbGQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAkKCcuaGFzLWNoaWxkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gYWRkZWQgdGhpc1xyXG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICB2YXIgJHRyaWdnZXIgPSAkKFwiLnNtLW9wZW5lZFwiKTtcclxuICAgICAgaWYoJHRyaWdnZXIgIT09IGV2ZW50LnRhcmdldCAmJiAhJHRyaWdnZXIuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKXtcclxuICAgICAgICAkKCcuaGFzLXN1YiwgLmhhcy1jaGlsZCcpLnJlbW92ZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBuYXZUZXh0OiBbXSxcclxuICAgICAgICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0JyxcclxuICAgICAgICAgIGFuaW1hdGVJbjogJ2ZhZGVJbicsXHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxyXG4gICAgICAgICAgc21hcnRTcGVlZDogMjUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBzbGlja01vYmlsZSgpIHtcclxuICAgICAgJCgnLnNsaWNrLW1vYmlsZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmKHcgPCA1MDApe1xyXG4gICAgICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbmF2VGV4dDogW10sXHJcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiAzMCxcclxuICAgICAgICAgICAgYXV0b1dpZHRoOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfXNsaWNrTW9iaWxlKCk7XHJcbiAgICBmdW5jdGlvbiBwcmljZU1vYmlsZSgpIHtcclxuICAgICAgJCgnLnByaWNlLW1vYmlsZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmKHcgPCA1MDApe1xyXG4gICAgICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ3JvdycpO1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIG5hdlRleHQ6IFtcIjxpIGNsYXNzPSdmYSBmYS1jaGV2cm9uLWxlZnQnPjwvaT5cIixcIjxpIGNsYXNzPSdmYSBmYS1jaGV2cm9uLXJpZ2h0Jz48L2k+XCJdLFxyXG4gICAgICAgICAgICBpdGVtczogMyxcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiAxMCxcclxuICAgICAgICAgICAgYXV0b1dpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBtYXJnaW46IDE2LFxyXG4gICAgICAgICAgICBjZW50ZXI6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9cHJpY2VNb2JpbGUoKTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNsaWNrTW9iaWxlKCk7XHJcbiAgICAgIHByaWNlTW9iaWxlKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIubG9nby1ncmlkXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdCA9ICQodGhpcylcclxuICAgICAgLCBlID0gdC5jbG9zZXN0KFwiLmxvZ28tZ3JpZF9fY29udGFpbmVyXCIpO1xyXG4gICAgZS5tYXJxdWVlKHtcclxuICAgICAgICBkdXJhdGlvbjogMjVlMyxcclxuICAgICAgICBzdGFydFZpc2libGU6ICEwLFxyXG4gICAgICAgIGR1cGxpY2F0ZWQ6IDEsXHJcbiAgICAgICAgZ2FwOiAwLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogITBcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgJCgnLnNjcmxkb3duJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcFxyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIC8vIFNlbGVjdCBhbGwgbGlua3Mgd2l0aCBoYXNoZXNcclxuICAkKCdhW2hyZWYqPVwiI1wiXScpXHJcbiAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xyXG4gIC5ub3QoJ1tocmVmPVwiI1wiXScpXHJcbiAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXHJcbiAgLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBPbi1wYWdlIGxpbmtzXHJcbiAgICBpZiAoXHJcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmXHJcbiAgICAgIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWVcclxuICAgICkge1xyXG4gICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgICAgaGggPSBoZWQuaGVpZ2h0KCk7XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsgJ10nKTtcclxuICAgICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XHJcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gT25seSBwcmV2ZW50IGRlZmF1bHQgaWYgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGdvbm5hIGhhcHBlblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyBDYWxsYmFjayBhZnRlciBhbmltYXRpb25cclxuICAgICAgICAgIC8vIE11c3QgY2hhbmdlIGZvY3VzIVxyXG4gICAgICAgICAgdmFyICR0YXJnZXQgPSAkKHRhcmdldCk7XHJcbiAgICAgICAgICAkdGFyZ2V0LmZvY3VzKCk7XHJcbiAgICAgICAgICBpZiAoJHRhcmdldC5pcyhcIjpmb2N1c1wiKSkgeyAvLyBDaGVja2luZyBpZiB0aGUgdGFyZ2V0IHdhcyBmb2N1c2VkXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTsgLy8gQWRkaW5nIHRhYmluZGV4IGZvciBlbGVtZW50cyBub3QgZm9jdXNhYmxlXHJcbiAgICAgICAgICAgICR0YXJnZXQuZm9jdXMoKTsgLy8gU2V0IGZvY3VzIGFnYWluXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIHRvIHRvcCByaWdodCBhd2F5XHJcbiAgaWYgKCB3aW5kb3cubG9jYXRpb24uaGFzaCApIHNjcm9sbCgwLDApO1xyXG4gIC8vIHZvaWQgc29tZSBicm93c2VycyBpc3N1ZVxyXG4gIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkgeyBzY3JvbGwoMCwwKTsgfSwgMSk7XHJcblxyXG4gICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8geW91ciBjdXJyZW50IGNsaWNrIGZ1bmN0aW9uXHJcbiAgICAkKCcuc2Nyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gaGggICsgJ3B4J1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gKm9ubHkqIGlmIHdlIGhhdmUgYW5jaG9yIG9uIHRoZSB1cmxcclxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgLy8gc21vb3RoIHNjcm9sbCB0byB0aGUgYW5jaG9yIGlkXHJcbiAgICAgICAgdmFyIGhlZCA9ICQoJ2JvZHknKS5maW5kKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgICAgIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCh3aW5kb3cubG9jYXRpb24uaGFzaCkub2Zmc2V0KCkudG9wIC0gaGggKyAncHgnXHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gIC8vIENvdW50ZG93blxyXG4gIC8vIFNldCB0aGUgZGF0ZSB3ZSdyZSBjb3VudGluZyBkb3duIHRvXHJcblxyXG5cclxuICAvLyBVcGRhdGUgdGhlIGNvdW50IGRvd24gZXZlcnkgMSBzZWNvbmRcclxuICBqUXVlcnkoJyNjb3VudGRvd25Db3VudGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGR0YWRhdGUgPSBqUXVlcnkodGhpcykuZGF0YSgnZGF0ZScpO1xyXG4gICAgdmFyIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZShkdGFkYXRlKS5nZXRUaW1lKCk7XHJcbiAgICBpZihkdGFkYXRlICE9IFwiXCIpe1xyXG4gICAgICB2YXIgeCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEdldCB0b2RheSdzIGRhdGUgYW5kIHRpbWVcclxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIGRpc3RhbmNlIGJldHdlZW4gbm93IGFuZCB0aGUgY291bnQgZG93biBkYXRlXHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gY291bnREb3duRGF0ZSAtIG5vdztcclxuXHJcbiAgICAgICAgLy8gVGltZSBjYWxjdWxhdGlvbnMgZm9yIGRheXMsIGhvdXJzLCBtaW51dGVzIGFuZCBzZWNvbmRzXHJcbiAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcclxuICAgICAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XHJcbiAgICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IHRoZSByZXN1bHQgaW4gdGhlIGVsZW1lbnQgd2l0aCBpZD1cImRlbW9cIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRkb3duQ291bnRlclwiKS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2NkIGNkLWRheXMnPiA8Yj5cIiArIGRheXMgKyBcIjwvYj4gPHNwYW4+RGF5czwvc3Bhbj4gPC9kaXY+IFwiICsgXCI8ZGl2IGNsYXNzPSdjZCBjZC1ob3VyJz4gPGI+XCIgKyBob3VycyArIFwiPC9iPiA8c3Bhbj5Ib3Vyczwvc3Bhbj4gPC9kaXY+XCIrIFwiPGRpdiBjbGFzcz0nY2QgY2QtbWluJz4gPGI+XCIgKyBtaW51dGVzICsgXCI8L2I+IDxzcGFuPk1pbnV0ZXM8L3NwYW4+IDwvZGl2PlwiICsgXCI8ZGl2IGNsYXNzPSdjZCBjZC1zZWMnPiA8Yj5cIiArIHNlY29uZHMgKyBcIjwvYj4gPHNwYW4+U2Vjb25kczwvc3Bhbj4gPC9kaXY+XCI7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb3VudCBkb3duIGlzIGZpbmlzaGVkLCB3cml0ZSBzb21lIHRleHRcclxuICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHgpO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGRvd25Db3VudGVyXCIpLmlubmVySFRNTCA9IFwiRVhQSVJFRFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgJCgnLnRleHQtZWxsaXBzaXMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyICRlbGVtID0gJCh0aGlzKTtcclxuICAgIHZhciBtYXhIZWlnaHQgPSBwYXJzZUludCgkZWxlbS5jc3MoJ2xpbmUtaGVpZ2h0JyksIDE2KSAqIDQ7IC8vIFRpbmdnaSBtYWtzaW11bSBrb250YWluZXIgKDMgYmFyaXMpXHJcbiAgICB2YXIgdGV4dCA9ICRlbGVtLnRleHQoKTtcclxuICAgIHZhciBjbG9uZSA9ICRlbGVtLmNsb25lKCkuY3NzKHtcclxuICAgICAgJ2hlaWdodCc6ICdhdXRvJyxcclxuICAgICAgJ3dpZHRoJzogJGVsZW0ud2lkdGgoKSxcclxuICAgICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXHJcbiAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICd0b3AnOiAnLTk5OTlweCdcclxuICAgIH0pLnRleHQodGV4dCkuYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgIHZhciBoZWlnaHQgPSBjbG9uZS5oZWlnaHQoKTtcclxuICAgIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgaWYgKGhlaWdodCA+IG1heEhlaWdodCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KCcgJyk7XHJcbiAgICAgIHZhciBlbGxpcHNpc1RleHQgPSAnJztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZXN0VGV4dCA9IGVsbGlwc2lzVGV4dCArICcgJyArIHdvcmRzW2ldO1xyXG4gICAgICAgIGNsb25lID0gJGVsZW0uY2xvbmUoKS5jc3Moe1xyXG4gICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICd0b3AnOiAnLTk5OTlweCcsXHJcbiAgICAgICAgICAnd2lkdGgnOiAkZWxlbS53aWR0aCgpXHJcbiAgICAgICAgfSkudGV4dCh0ZXN0VGV4dCkuYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICAgICBpZiAoY2xvbmUuaGVpZ2h0KCkgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICRlbGVtLnRleHQoZWxsaXBzaXNUZXh0ICsgJy4uLicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsbGlwc2lzVGV4dCA9IHRlc3RUZXh0O1xyXG4gICAgICAgIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIH07XHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
