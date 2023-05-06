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

  function hashSmoothScroll() {
    $(".toc_sidebar a").on('click', function (event) {

      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 500, function () {

          window.location.hash = hash;
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

  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG4gIGZ1bmN0aW9uIHRvU3ZnKG9iaikge1xyXG4gICAgdmFyICRpbWcgPSBvYmo7XHJcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICB9LCAneG1sJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHRvU3ZnKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDIwMCk7XHJcbiAgICAgICQoXCIjd3JhcFwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgLy8gRml4ZWQgSGVhZGVyXHJcbiAgICB2YXIgJGhlYWRlciA9ICQoJ2hlYWRlcicpLFxyXG4gICAgICAgICR3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICRwb3MgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCkgKyA0MDtcclxuICAgIGZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgICB2YXIgJHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKCR0b3AgPiAxMCkge1xyXG4gICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZml4ZWRIZWFkZXIoKTtcclxuICAgIC8vIENhbGwgRnVuY3Rpb25cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZpeGVkSGVhZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYnVyZ2VyLW1lbnUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWluLW1lbnUtb3BlbicpO1xyXG4gICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgfSlcclxuICAgICQoJy5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBzYiA9IHQuZmluZCgndWwnKTtcclxuICAgICAgc2IuYWRkQ2xhc3MoJ3N1Yi1tZW51Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vICQoJy5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8gICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAvLyAgICAgICBzYiA9IHQuZmluZCgndWwnKTtcclxuICAgIC8vICAgc2IuYWRkQ2xhc3MoJ3N1Yi1tZW51Jyk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vICQoJy5oYXMtc3ViJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gJCgnLmhhcy1jaGlsZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgICQoJy5oYXMtc3ViLCAuaGFzLWNoaWxkJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIGFkZGVkIHRoaXNcclxuICAgICAgJCgnLmhhcy1zdWInKS5yZW1vdmVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIHZhciAkdHJpZ2dlciA9ICQoXCIuc20tb3BlbmVkXCIpO1xyXG4gICAgICBpZigkdHJpZ2dlciAhPT0gZXZlbnQudGFyZ2V0ICYmICEkdHJpZ2dlci5oYXMoZXZlbnQudGFyZ2V0KS5sZW5ndGgpe1xyXG4gICAgICAgICQoJy5oYXMtc3ViLCAuaGFzLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICQoJy5zbGlkZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICB0LmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcclxuICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgIG5hdlRleHQ6IFtdLFxyXG4gICAgICAgICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnLFxyXG4gICAgICAgICAgYW5pbWF0ZUluOiAnZmFkZUluJyxcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXHJcbiAgICAgICAgICBzbWFydFNwZWVkOiAyNTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIHNsaWNrTW9iaWxlKCkge1xyXG4gICAgICAkKCcuc2xpY2stbW9iaWxlJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgICAgaWYodyA8IDUwMCl7XHJcbiAgICAgICAgICB0LmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcclxuICAgICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBuYXZUZXh0OiBbXSxcclxuICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGFnZVBhZGRpbmc6IDMwLFxyXG4gICAgICAgICAgICBhdXRvV2lkdGg6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9c2xpY2tNb2JpbGUoKTtcclxuICAgIGZ1bmN0aW9uIHNsaWRlcm1vYmlsZSgpIHtcclxuICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgIHNsaWRlciA9ICQoJy5zbGlkZXItbWQnKTtcclxuICAgICAgaWYgKHcgPCA5OTkpIHtcclxuICAgICAgICAgIHNsaWRlci5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ25zJyk7XHJcbiAgICAgICAgICBzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA/IHQuYXR0cignZGF0YS1pdGVtcycpIDogMSxcclxuICAgICAgICAgICAgICAgICAgbmF2cyA9IHQuYXR0cignZGF0YS1uYXYnKSAmJiB0LmF0dHIoJ2RhdGEtbmF2JykgPT0gXCJub1wiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBkb3QgPSBuYXZzID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBsb29wcyA9IHQuYXR0cignZGF0YS1sb29wJykgJiYgdC5hdHRyKCdkYXRhLWxvb3AnKSA9PSBcIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW10YWIgPSBpdGVtID4gMyA/IDMgOiBpdGVtLFxyXG4gICAgICAgICAgICAgICAgICBpdGVtbHRhYiA9IGl0ZW0gPiA0ID8gNCA6IGl0ZW07XHJcbiAgICAgICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignc3RvcC5vd2wuYXV0b3BsYXknKTtcclxuICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcigncGxheS5vd2wuYXV0b3BsYXknKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBzbGlkZXJtb2JpbGUoKTtcclxuXHJcblxyXG5cclxuICAkKFwiLmxvZ28tZ3JpZFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpXHJcbiAgICAgICwgZSA9IHQuY2xvc2VzdChcIi5sb2dvLWdyaWRfX2NvbnRhaW5lclwiKTtcclxuICAgIGUubWFycXVlZSh7XHJcbiAgICAgICAgZHVyYXRpb246IDI1ZTMsXHJcbiAgICAgICAgc3RhcnRWaXNpYmxlOiAhMCxcclxuICAgICAgICBkdXBsaWNhdGVkOiAxLFxyXG4gICAgICAgIGdhcDogMCxcclxuICAgICAgICBwYXVzZU9uSG92ZXI6ICEwXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gICQoJy5zY3JsZG93bicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6ICQodGFyZ2V0KS5vZmZzZXQoKS50b3BcclxuICAgICAgfSwgNjAwKTtcclxuICAgIH0pXHJcbiAgfSlcclxuICAvLyBTZWxlY3QgYWxsIGxpbmtzIHdpdGggaGFzaGVzXHJcbiAgJCgnYVtocmVmKj1cIiNcIl0nKVxyXG4gIC8vIFJlbW92ZSBsaW5rcyB0aGF0IGRvbid0IGFjdHVhbGx5IGxpbmsgdG8gYW55dGhpbmdcclxuICAubm90KCdbaHJlZj1cIiNcIl0nKVxyXG4gIC5ub3QoJ1tocmVmPVwiIzBcIl0nKVxyXG4gIC5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy8gT24tcGFnZSBsaW5rc1xyXG4gICAgaWYgKFxyXG4gICAgICBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJlxyXG4gICAgICBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lXHJcbiAgICApIHtcclxuICAgICAgLy8gRmlndXJlIG91dCBlbGVtZW50IHRvIHNjcm9sbCB0b1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICB2YXIgaGVkID0gJCgnYm9keScpLmZpbmQoJy5tYWluLW1lbnUnKTtcclxuICAgICAgICAgIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XHJcbiAgICAgIC8vIERvZXMgYSBzY3JvbGwgdGFyZ2V0IGV4aXN0P1xyXG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIC8vIE9ubHkgcHJldmVudCBkZWZhdWx0IGlmIGFuaW1hdGlvbiBpcyBhY3R1YWxseSBnb25uYSBoYXBwZW5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXHJcbiAgICAgICAgICAvLyBNdXN0IGNoYW5nZSBmb2N1cyFcclxuICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xyXG4gICAgICAgICAgJHRhcmdldC5mb2N1cygpO1xyXG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoXCI6Zm9jdXNcIikpIHsgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCB3YXMgZm9jdXNlZFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7IC8vIEFkZGluZyB0YWJpbmRleCBmb3IgZWxlbWVudHMgbm90IGZvY3VzYWJsZVxyXG4gICAgICAgICAgICAkdGFyZ2V0LmZvY3VzKCk7IC8vIFNldCBmb2N1cyBhZ2FpblxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyB0byB0b3AgcmlnaHQgYXdheVxyXG4gIGlmICggd2luZG93LmxvY2F0aW9uLmhhc2ggKSBzY3JvbGwoMCwwKTtcclxuICAvLyB2b2lkIHNvbWUgYnJvd3NlcnMgaXNzdWVcclxuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHsgc2Nyb2xsKDAsMCk7IH0sIDEpO1xyXG5cclxuICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIHlvdXIgY3VycmVudCBjbGljayBmdW5jdGlvblxyXG4gICAgJCgnLnNjcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgaGVkID0gJCgnYm9keScpLmZpbmQoJy5tYWluLW1lbnUnKTtcclxuICAgICAgICBoaCA9IGhlZC5oZWlnaHQoKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcCAtIGhoICArICdweCdcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vICpvbmx5KiBpZiB3ZSBoYXZlIGFuY2hvciBvbiB0aGUgdXJsXHJcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgIC8vIHNtb290aCBzY3JvbGwgdG8gdGhlIGFuY2hvciBpZFxyXG4gICAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgICAgICBoaCA9IGhlZC5oZWlnaHQoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQod2luZG93LmxvY2F0aW9uLmhhc2gpLm9mZnNldCgpLnRvcCAtIGhoICsgJ3B4J1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyBDb3VudGRvd25cclxuICAvLyBTZXQgdGhlIGRhdGUgd2UncmUgY291bnRpbmcgZG93biB0b1xyXG5cclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBjb3VudCBkb3duIGV2ZXJ5IDEgc2Vjb25kXHJcbiAgalF1ZXJ5KCcjY291bnRkb3duQ291bnRlcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciBkdGFkYXRlID0galF1ZXJ5KHRoaXMpLmRhdGEoJ2RhdGUnKTtcclxuICAgIHZhciBjb3VudERvd25EYXRlID0gbmV3IERhdGUoZHRhZGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgaWYoZHRhZGF0ZSAhPSBcIlwiKXtcclxuICAgICAgdmFyIHggPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBHZXQgdG9kYXkncyBkYXRlIGFuZCB0aW1lXHJcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIG5vdyBhbmQgdGhlIGNvdW50IGRvd24gZGF0ZVxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XHJcblxyXG4gICAgICAgIC8vIFRpbWUgY2FsY3VsYXRpb25zIGZvciBkYXlzLCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kc1xyXG4gICAgICAgIHZhciBkYXlzID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcbiAgICAgICAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xyXG4gICAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGxheSB0aGUgcmVzdWx0IGluIHRoZSBlbGVtZW50IHdpdGggaWQ9XCJkZW1vXCJcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZG93bkNvdW50ZXJcIikuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdjZCBjZC1kYXlzJz4gPGI+XCIgKyBkYXlzICsgXCI8L2I+IDxzcGFuPkRheXM8L3NwYW4+IDwvZGl2PiBcIiArIFwiPGRpdiBjbGFzcz0nY2QgY2QtaG91cic+IDxiPlwiICsgaG91cnMgKyBcIjwvYj4gPHNwYW4+SG91cnM8L3NwYW4+IDwvZGl2PlwiKyBcIjxkaXYgY2xhc3M9J2NkIGNkLW1pbic+IDxiPlwiICsgbWludXRlcyArIFwiPC9iPiA8c3Bhbj5NaW51dGVzPC9zcGFuPiA8L2Rpdj5cIiArIFwiPGRpdiBjbGFzcz0nY2QgY2Qtc2VjJz4gPGI+XCIgKyBzZWNvbmRzICsgXCI8L2I+IDxzcGFuPlNlY29uZHM8L3NwYW4+IDwvZGl2PlwiO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY291bnQgZG93biBpcyBmaW5pc2hlZCwgd3JpdGUgc29tZSB0ZXh0XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCkge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh4KTtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRkb3duQ291bnRlclwiKS5pbm5lckhUTUwgPSBcIkVYUElSRURcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gICQoJy50ZXh0LWVsbGlwc2lzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciAkZWxlbSA9ICQodGhpcyk7XHJcbiAgICB2YXIgbWF4SGVpZ2h0ID0gcGFyc2VJbnQoJGVsZW0uY3NzKCdsaW5lLWhlaWdodCcpLCAxNikgKiA0OyAvLyBUaW5nZ2kgbWFrc2ltdW0ga29udGFpbmVyICgzIGJhcmlzKVxyXG4gICAgdmFyIHRleHQgPSAkZWxlbS50ZXh0KCk7XHJcbiAgICB2YXIgY2xvbmUgPSAkZWxlbS5jbG9uZSgpLmNzcyh7XHJcbiAgICAgICdoZWlnaHQnOiAnYXV0bycsXHJcbiAgICAgICd3aWR0aCc6ICRlbGVtLndpZHRoKCksXHJcbiAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxyXG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAndG9wJzogJy05OTk5cHgnXHJcbiAgICB9KS50ZXh0KHRleHQpLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICB2YXIgaGVpZ2h0ID0gY2xvbmUuaGVpZ2h0KCk7XHJcbiAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgIGlmIChoZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdCgnICcpO1xyXG4gICAgICB2YXIgZWxsaXBzaXNUZXh0ID0gJyc7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVzdFRleHQgPSBlbGxpcHNpc1RleHQgKyAnICcgKyB3b3Jkc1tpXTtcclxuICAgICAgICBjbG9uZSA9ICRlbGVtLmNsb25lKCkuY3NzKHtcclxuICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAndG9wJzogJy05OTk5cHgnLFxyXG4gICAgICAgICAgJ3dpZHRoJzogJGVsZW0ud2lkdGgoKVxyXG4gICAgICAgIH0pLnRleHQodGVzdFRleHQpLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgaWYgKGNsb25lLmhlaWdodCgpID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAkZWxlbS50ZXh0KGVsbGlwc2lzVGV4dCArICcuLi4nKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGxpcHNpc1RleHQgPSB0ZXN0VGV4dDtcclxuICAgICAgICBjbG9uZS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBoYXNoU21vb3RoU2Nyb2xsKCkge1xyXG4gICAgJChcIi50b2Nfc2lkZWJhciBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGFzaCAhPT0gXCJcIikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciBoYXNoID0gdGhpcy5oYXNoO1xyXG5cclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6ICQoaGFzaCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgNTAwLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaGFzaFNtb290aFNjcm9sbCgpO1xyXG5cclxuICAvLyBTZWxlY3QgTW9iaWxlXHJcbiAgJCgnLnRvY19zaWRlYmFyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIGEgPSB0LmZpbmQoJy5zdWItaXRlbV9fbGluaycpLFxyXG4gICAgICAgIGFhID0gdC5maW5kKCdsaTpmaXJzdC1jaGlsZCAuc3ViLWl0ZW1fX2xpbmsnKSxcclxuICAgICAgICBzZWxlY3QgPSAkKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudSBuYXZcIj4nKSxcclxuICAgICAgICB0b2dnbGUgPSAkKFwiPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1ib3JkZXIgYnRuLWJsb2NrIGRyb3Bkb3duLXRvZ2dsZScgZGF0YS10b2dnbGU9J2Ryb3Bkb3duJz5cIithYS5odG1sKCkrXCI8L2J1dHRvbj5cIiksXHJcbiAgICAgICAgc3QgPSAkKFwiPGRpdiBjbGFzcz0nZHJvcGRvd24gZHJvcGRvd24tbmF2JyAvPlwiKTtcclxuXHJcbiAgICBhLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYyA9ICQodGhpcykuY2xvbmUoKVxyXG4gICAgICAgIGMuYWRkQ2xhc3MoJ2Ryb3Bkb3duLW5hdi1pdGVtJylcclxuICAgICAgICBzZWxlY3QuYXBwZW5kKGMpXHJcblxyXG4gICAgICAgIGMub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgLy8gdG9nZ2xlLnRleHQoZS50YXJnZXQuaW5uZXJUZXh0KVxyXG4gICAgICAgICAgICB0b2dnbGUuaHRtbCgkKGUudGFyZ2V0KS5odG1sKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgc3QuYXBwZW5kKHRvZ2dsZSk7XHJcbiAgICBzdC5hcHBlbmQoc2VsZWN0KTtcclxuICAgIHN0Lmluc2VydEFmdGVyKHQpO1xyXG5cclxuICAgICQoYSkub24oJ3Nob3cuYnMudGFiJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgdCA9IGUudGFyZ2V0LmlubmVyVGV4dFxyXG4gICAgICAgIHRvZ2dsZS5odG1sKHQpXHJcbiAgICAgICAgc2VsZWN0LmZpbmQoXCIuZHJvcGRvd24tbmF2LWl0ZW06Y29udGFpbnMoXCIrdCtcIilcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgdG9nZ2xlLmh0bWwoJCh0aGlzKS5odG1sKCkpO1xyXG4gICAgfSlcclxuXHJcblxyXG59KTtcclxuXHJcbiAgfTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
