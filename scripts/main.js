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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG4gIGZ1bmN0aW9uIHRvU3ZnKG9iaikge1xyXG4gICAgdmFyICRpbWcgPSBvYmo7XHJcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICB9LCAneG1sJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHRvU3ZnKCQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICBqUXVlcnkoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdCA9IGpRdWVyeSh0aGlzKSxcclxuICAgICAgICBzaXplID0gKHNlbGVjdC5kYXRhKCdzaXplJykgIT09IHVuZGVmaW5lZCkgPyBzZWxlY3QuZGF0YSgnc2l6ZScpIDogNDtcclxuICAgICAgc2VsZWN0LnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgc2l6ZTogc2l6ZSxcclxuICAgICAgICBsaXZlU2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2ggaGVyZS4uJyxcclxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhzaXplKTtcclxuICB9KTtcclxuICAgIHNldFRpbWVvdXQoZnVuYywgMjAwKTtcclxuICAgICAgJChcIiN3cmFwXCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gIH1pbml0KCk7XHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcbiAgICAvLyBGaXhlZCBIZWFkZXJcclxuICAgIHZhciAkaGVhZGVyID0gJCgnaGVhZGVyJyksXHJcbiAgICAgICAgJHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgJHBvcyA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKSArIDQwO1xyXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XHJcbiAgICAgIHZhciAkdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBpZiAoJHRvcCA+IDEwKSB7XHJcbiAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmaXhlZEhlYWRlcigpO1xyXG4gICAgLy8gQ2FsbCBGdW5jdGlvblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgZml4ZWRIZWFkZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5idXJnZXItbWVudScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21haW4tbWVudS1vcGVuJyk7XHJcbiAgICAgICQoJy5oYXMtc3ViJykucmVtb3ZlQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICB9KVxyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgIC8vICAgICAgIHNiID0gdC5maW5kKCd1bCcpO1xyXG4gICAgLy8gICBzYi5hZGRDbGFzcygnc3ViLW1lbnUnKTtcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAkKCcuaGFzLWNoaWxkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NtLW9wZW5lZCcpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gYWRkZWQgdGhpc1xyXG4gICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzbS1vcGVuZWQnKTtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgdmFyICR0cmlnZ2VyID0gJChcIi5zbS1vcGVuZWRcIik7XHJcbiAgICAgIGlmKCR0cmlnZ2VyICE9PSBldmVudC50YXJnZXQgJiYgISR0cmlnZ2VyLmhhcyhldmVudC50YXJnZXQpLmxlbmd0aCl7XHJcbiAgICAgICAgJCgnLmhhcy1zdWIsIC5oYXMtY2hpbGQnKS5yZW1vdmVDbGFzcygnc20tb3BlbmVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJCgnLnNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgbmF2VGV4dDogW10sXHJcbiAgICAgICAgICBhbmltYXRlT3V0OiAnZmFkZU91dCcsXHJcbiAgICAgICAgICBhbmltYXRlSW46ICdmYWRlSW4nLFxyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICAgIHNtYXJ0U3BlZWQ6IDI1MDBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gc2xpY2tNb2JpbGUoKSB7XHJcbiAgICAgICQoJy5zbGljay1tb2JpbGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgICBpZih3IDwgNTAwKXtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIG5hdlRleHQ6IFtdLFxyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogMzAsXHJcbiAgICAgICAgICAgIGF1dG9XaWR0aDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1zbGlja01vYmlsZSgpO1xyXG4gICAgZnVuY3Rpb24gc2xpZGVybW9iaWxlKCkge1xyXG4gICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgc2xpZGVyID0gJCgnLnNsaWRlci1tZCcpO1xyXG4gICAgICBpZiAodyA8IDk5OSkge1xyXG4gICAgICAgICAgc2xpZGVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnbnMnKTtcclxuICAgICAgICAgIHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgaXRlbSA9IHQuYXR0cignZGF0YS1pdGVtcycpID8gdC5hdHRyKCdkYXRhLWl0ZW1zJykgOiAxLFxyXG4gICAgICAgICAgICAgICAgICBuYXZzID0gdC5hdHRyKCdkYXRhLW5hdicpICYmIHQuYXR0cignZGF0YS1uYXYnKSA9PSBcIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIGRvdCA9IG5hdnMgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIGxvb3BzID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpID09IFwibm9cIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgaXRlbXRhYiA9IGl0ZW0gPiAzID8gMyA6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW1sdGFiID0gaXRlbSA+IDQgPyA0IDogaXRlbTtcclxuICAgICAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdzdG9wLm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdwbGF5Lm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIHNsaWRlcm1vYmlsZSgpO1xyXG5cclxuXHJcblxyXG4gICQoXCIubG9nby1ncmlkXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdCA9ICQodGhpcylcclxuICAgICAgLCBlID0gdC5jbG9zZXN0KFwiLmxvZ28tZ3JpZF9fY29udGFpbmVyXCIpO1xyXG4gICAgZS5tYXJxdWVlKHtcclxuICAgICAgICBkdXJhdGlvbjogMjVlMyxcclxuICAgICAgICBzdGFydFZpc2libGU6ICEwLFxyXG4gICAgICAgIGR1cGxpY2F0ZWQ6IDEsXHJcbiAgICAgICAgZ2FwOiAwLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogITBcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgJCgnLnNjcmxkb3duJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcFxyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIC8vIFNlbGVjdCBhbGwgbGlua3Mgd2l0aCBoYXNoZXNcclxuICAkKCdhW2hyZWYqPVwiI1wiXScpXHJcbiAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xyXG4gIC5ub3QoJ1tocmVmPVwiI1wiXScpXHJcbiAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXHJcbiAgLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBPbi1wYWdlIGxpbmtzXHJcbiAgICBpZiAoXHJcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmXHJcbiAgICAgIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWVcclxuICAgICkge1xyXG4gICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgICAgaGggPSBoZWQuaGVpZ2h0KCk7XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsgJ10nKTtcclxuICAgICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XHJcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gT25seSBwcmV2ZW50IGRlZmF1bHQgaWYgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGdvbm5hIGhhcHBlblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyBDYWxsYmFjayBhZnRlciBhbmltYXRpb25cclxuICAgICAgICAgIC8vIE11c3QgY2hhbmdlIGZvY3VzIVxyXG4gICAgICAgICAgdmFyICR0YXJnZXQgPSAkKHRhcmdldCk7XHJcbiAgICAgICAgICAkdGFyZ2V0LmZvY3VzKCk7XHJcbiAgICAgICAgICBpZiAoJHRhcmdldC5pcyhcIjpmb2N1c1wiKSkgeyAvLyBDaGVja2luZyBpZiB0aGUgdGFyZ2V0IHdhcyBmb2N1c2VkXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTsgLy8gQWRkaW5nIHRhYmluZGV4IGZvciBlbGVtZW50cyBub3QgZm9jdXNhYmxlXHJcbiAgICAgICAgICAgICR0YXJnZXQuZm9jdXMoKTsgLy8gU2V0IGZvY3VzIGFnYWluXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIHRvIHRvcCByaWdodCBhd2F5XHJcbiAgaWYgKCB3aW5kb3cubG9jYXRpb24uaGFzaCApIHNjcm9sbCgwLDApO1xyXG4gIC8vIHZvaWQgc29tZSBicm93c2VycyBpc3N1ZVxyXG4gIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkgeyBzY3JvbGwoMCwwKTsgfSwgMSk7XHJcblxyXG4gICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8geW91ciBjdXJyZW50IGNsaWNrIGZ1bmN0aW9uXHJcbiAgICAkKCcuc2Nyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBoZWQgPSAkKCdib2R5JykuZmluZCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gaGggICsgJ3B4J1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gKm9ubHkqIGlmIHdlIGhhdmUgYW5jaG9yIG9uIHRoZSB1cmxcclxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgLy8gc21vb3RoIHNjcm9sbCB0byB0aGUgYW5jaG9yIGlkXHJcbiAgICAgICAgdmFyIGhlZCA9ICQoJ2JvZHknKS5maW5kKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgICAgIGhoID0gaGVkLmhlaWdodCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCh3aW5kb3cubG9jYXRpb24uaGFzaCkub2Zmc2V0KCkudG9wIC0gaGggKyAncHgnXHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gIC8vIENvdW50ZG93blxyXG4gIC8vIFNldCB0aGUgZGF0ZSB3ZSdyZSBjb3VudGluZyBkb3duIHRvXHJcblxyXG5cclxuICAvLyBVcGRhdGUgdGhlIGNvdW50IGRvd24gZXZlcnkgMSBzZWNvbmRcclxuICBqUXVlcnkoJyNjb3VudGRvd25Db3VudGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGR0YWRhdGUgPSBqUXVlcnkodGhpcykuZGF0YSgnZGF0ZScpO1xyXG4gICAgdmFyIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZShkdGFkYXRlKS5nZXRUaW1lKCk7XHJcbiAgICBpZihkdGFkYXRlICE9IFwiXCIpe1xyXG4gICAgICB2YXIgeCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEdldCB0b2RheSdzIGRhdGUgYW5kIHRpbWVcclxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIGRpc3RhbmNlIGJldHdlZW4gbm93IGFuZCB0aGUgY291bnQgZG93biBkYXRlXHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gY291bnREb3duRGF0ZSAtIG5vdztcclxuXHJcbiAgICAgICAgLy8gVGltZSBjYWxjdWxhdGlvbnMgZm9yIGRheXMsIGhvdXJzLCBtaW51dGVzIGFuZCBzZWNvbmRzXHJcbiAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcclxuICAgICAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XHJcbiAgICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IHRoZSByZXN1bHQgaW4gdGhlIGVsZW1lbnQgd2l0aCBpZD1cImRlbW9cIlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRkb3duQ291bnRlclwiKS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2NkIGNkLWRheXMnPiA8Yj5cIiArIGRheXMgKyBcIjwvYj4gPHNwYW4+RGF5czwvc3Bhbj4gPC9kaXY+IFwiICsgXCI8ZGl2IGNsYXNzPSdjZCBjZC1ob3VyJz4gPGI+XCIgKyBob3VycyArIFwiPC9iPiA8c3Bhbj5Ib3Vyczwvc3Bhbj4gPC9kaXY+XCIrIFwiPGRpdiBjbGFzcz0nY2QgY2QtbWluJz4gPGI+XCIgKyBtaW51dGVzICsgXCI8L2I+IDxzcGFuPk1pbnV0ZXM8L3NwYW4+IDwvZGl2PlwiICsgXCI8ZGl2IGNsYXNzPSdjZCBjZC1zZWMnPiA8Yj5cIiArIHNlY29uZHMgKyBcIjwvYj4gPHNwYW4+U2Vjb25kczwvc3Bhbj4gPC9kaXY+XCI7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb3VudCBkb3duIGlzIGZpbmlzaGVkLCB3cml0ZSBzb21lIHRleHRcclxuICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHgpO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGRvd25Db3VudGVyXCIpLmlubmVySFRNTCA9IFwiRVhQSVJFRFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgJCgnLnRleHQtZWxsaXBzaXMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyICRlbGVtID0gJCh0aGlzKTtcclxuICAgIHZhciBtYXhIZWlnaHQgPSBwYXJzZUludCgkZWxlbS5jc3MoJ2xpbmUtaGVpZ2h0JyksIDE2KSAqIDQ7IC8vIFRpbmdnaSBtYWtzaW11bSBrb250YWluZXIgKDMgYmFyaXMpXHJcbiAgICB2YXIgdGV4dCA9ICRlbGVtLnRleHQoKTtcclxuICAgIHZhciBjbG9uZSA9ICRlbGVtLmNsb25lKCkuY3NzKHtcclxuICAgICAgJ2hlaWdodCc6ICdhdXRvJyxcclxuICAgICAgJ3dpZHRoJzogJGVsZW0ud2lkdGgoKSxcclxuICAgICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXHJcbiAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICd0b3AnOiAnLTk5OTlweCdcclxuICAgIH0pLnRleHQodGV4dCkuYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgIHZhciBoZWlnaHQgPSBjbG9uZS5oZWlnaHQoKTtcclxuICAgIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgaWYgKGhlaWdodCA+IG1heEhlaWdodCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KCcgJyk7XHJcbiAgICAgIHZhciBlbGxpcHNpc1RleHQgPSAnJztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZXN0VGV4dCA9IGVsbGlwc2lzVGV4dCArICcgJyArIHdvcmRzW2ldO1xyXG4gICAgICAgIGNsb25lID0gJGVsZW0uY2xvbmUoKS5jc3Moe1xyXG4gICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICd0b3AnOiAnLTk5OTlweCcsXHJcbiAgICAgICAgICAnd2lkdGgnOiAkZWxlbS53aWR0aCgpXHJcbiAgICAgICAgfSkudGV4dCh0ZXN0VGV4dCkuYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICAgICBpZiAoY2xvbmUuaGVpZ2h0KCkgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICRlbGVtLnRleHQoZWxsaXBzaXNUZXh0ICsgJy4uLicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsbGlwc2lzVGV4dCA9IHRlc3RUZXh0O1xyXG4gICAgICAgIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGhhc2hTbW9vdGhTY3JvbGwoKSB7XHJcbiAgICAkKFwiLnRvY19zaWRlYmFyIGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5oYXNoICE9PSBcIlwiKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGhhc2ggPSB0aGlzLmhhc2g7XHJcblxyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogJChoYXNoKS5vZmZzZXQoKS50b3BcclxuICAgICAgICB9LCA1MDAsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBoYXNoU21vb3RoU2Nyb2xsKCk7XHJcblxyXG4gIC8vIFNlbGVjdCBNb2JpbGVcclxuICAkKCcudG9jX3NpZGViYXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgYSA9IHQuZmluZCgnLnN1Yi1pdGVtX19saW5rJyksXHJcbiAgICAgICAgYWEgPSB0LmZpbmQoJ2xpOmZpcnN0LWNoaWxkIC5zdWItaXRlbV9fbGluaycpLFxyXG4gICAgICAgIHNlbGVjdCA9ICQoJzxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51IG5hdlwiPicpLFxyXG4gICAgICAgIHRvZ2dsZSA9ICQoXCI8YnV0dG9uIGNsYXNzPSdidG4gYnRuLWJvcmRlciBidG4tYmxvY2sgZHJvcGRvd24tdG9nZ2xlJyBkYXRhLXRvZ2dsZT0nZHJvcGRvd24nPlwiK2FhLmh0bWwoKStcIjwvYnV0dG9uPlwiKSxcclxuICAgICAgICBzdCA9ICQoXCI8ZGl2IGNsYXNzPSdkcm9wZG93biBkcm9wZG93bi1uYXYnIC8+XCIpO1xyXG5cclxuICAgIGEuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjID0gJCh0aGlzKS5jbG9uZSgpXHJcbiAgICAgICAgYy5hZGRDbGFzcygnZHJvcGRvd24tbmF2LWl0ZW0nKVxyXG4gICAgICAgIHNlbGVjdC5hcHBlbmQoYylcclxuXHJcbiAgICAgICAgYy5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAvLyB0b2dnbGUudGV4dChlLnRhcmdldC5pbm5lclRleHQpXHJcbiAgICAgICAgICAgIHRvZ2dsZS5odG1sKCQoZS50YXJnZXQpLmh0bWwoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBzdC5hcHBlbmQodG9nZ2xlKTtcclxuICAgIHN0LmFwcGVuZChzZWxlY3QpO1xyXG4gICAgc3QuaW5zZXJ0QWZ0ZXIodCk7XHJcblxyXG4gICAgJChhKS5vbignc2hvdy5icy50YWInLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciB0ID0gZS50YXJnZXQuaW5uZXJUZXh0XHJcbiAgICAgICAgdG9nZ2xlLmh0bWwodClcclxuICAgICAgICBzZWxlY3QuZmluZChcIi5kcm9wZG93bi1uYXYtaXRlbTpjb250YWlucyhcIit0K1wiKVwiKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICB0b2dnbGUuaHRtbCgkKHRoaXMpLmh0bWwoKSk7XHJcbiAgICB9KVxyXG5cclxuXHJcbn0pO1xyXG5cclxuICB9O1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
