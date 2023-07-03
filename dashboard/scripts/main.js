$(function () {
  'use strict';
  function toSvg(obj) {
    var $img = obj;
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
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
    jQuery('img.svg').each(function (i) {
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
    });

    jQuery('.date').each(function () {
      var date = jQuery(this),
        input = date.find('input');
      input.datepicker();
    });

    $('.input-autosize').each(function () {
      autosize($(this));
    })

    setTimeout(func, 200);

    $("#wrap").addClass("load-page");
  } init();

  function func() {

    $('.sidebar').each(function () {
      var $t = $(this),
        $toggle = $t.find('.sidebar__toggle');

      $toggle.on('click', function () {
        $t.toggleClass('open');
      });
    });

    $('.has-word-count').each(function () {
      var $t = $(this),
        $input = $t.find('.hwc-input'),
        $counter = $t.find('.hwc-counter'),
        $max = $counter.data('max');

      $counter.text('-' + $max);

      $input.on('keyup', function (e) {
        var $el = $(this),
          $words = $el.val().length;

        if (parseInt($words) < parseInt($max)) {
          $counter.text('-' + ($max - $words));
          console.log('w: ' + $words + ', m:' + $max);
        } else {
          $counter.text('0');
          console.log('a')
        }
      });
    });

    $('.content__tabs').each(function () {
      var $t = $(this),
        $nav = $t.find('.nav-tabs'),
        $content = $t.find('.tab-content'),
        $pane = $t.find('.tab-pane'),
        $next = $t.find('.btn-next'),
        $back = $t.find('.btn-back');

      $next.each(function () {
        var $el = $(this),
          $target = $el.attr('href');

        $el.on('click', function () {
          $nav.find('.nav-link').removeClass('active');
          $nav.find('.nav-link[href="' + $target + '"]').addClass('active');
          $pane.removeClass('active');
          $($target).addClass('active');
        });
      })

      $back.each(function () {
        var $el = $(this),
          $target = $el.attr('href');

        $el.on('click', function () {
          $nav.find('.nav-link').removeClass('active');
          $nav.find('.nav-link[href="' + $target + '"]').addClass('active');
          $pane.removeClass('active');
          $($target).addClass('active');
        });
      })
    });

  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuICBmdW5jdGlvbiB0b1N2ZyhvYmopIHtcclxuICAgIHZhciAkaW1nID0gb2JqO1xyXG4gICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgIH1cclxuICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgfSwgJ3htbCcpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGpRdWVyeSgnaW1nLnN2ZycpLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgdG9TdmcoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdCA9IGpRdWVyeSh0aGlzKSxcclxuICAgICAgICBzaXplID0gKHNlbGVjdC5kYXRhKCdzaXplJykgIT09IHVuZGVmaW5lZCkgPyBzZWxlY3QuZGF0YSgnc2l6ZScpIDogNDtcclxuXHJcbiAgICAgIHNlbGVjdC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgICAgbGl2ZVNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLicsXHJcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeSgnLmRhdGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGRhdGUgPSBqUXVlcnkodGhpcyksXHJcbiAgICAgICAgaW5wdXQgPSBkYXRlLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0LmRhdGVwaWNrZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5pbnB1dC1hdXRvc2l6ZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICBhdXRvc2l6ZSgkKHRoaXMpKTtcclxuICAgIH0pXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jLCAyMDApO1xyXG5cclxuICAgICQoXCIjd3JhcFwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICB9IGluaXQoKTtcclxuXHJcbiAgZnVuY3Rpb24gZnVuYygpIHtcclxuXHJcbiAgICAkKCcuc2lkZWJhcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICR0b2dnbGUgPSAkdC5maW5kKCcuc2lkZWJhcl9fdG9nZ2xlJyk7XHJcblxyXG4gICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkdC50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oYXMtd29yZC1jb3VudCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRpbnB1dCA9ICR0LmZpbmQoJy5od2MtaW5wdXQnKSxcclxuICAgICAgICAkY291bnRlciA9ICR0LmZpbmQoJy5od2MtY291bnRlcicpLFxyXG4gICAgICAgICRtYXggPSAkY291bnRlci5kYXRhKCdtYXgnKTtcclxuXHJcbiAgICAgICRjb3VudGVyLnRleHQoJy0nICsgJG1heCk7XHJcblxyXG4gICAgICAkaW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICR3b3JkcyA9ICRlbC52YWwoKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZUludCgkd29yZHMpIDwgcGFyc2VJbnQoJG1heCkpIHtcclxuICAgICAgICAgICRjb3VudGVyLnRleHQoJy0nICsgKCRtYXggLSAkd29yZHMpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd3OiAnICsgJHdvcmRzICsgJywgbTonICsgJG1heCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRjb3VudGVyLnRleHQoJzAnKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdhJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmNvbnRlbnRfX3RhYnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkbmF2ID0gJHQuZmluZCgnLm5hdi10YWJzJyksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkdC5maW5kKCcudGFiLWNvbnRlbnQnKSxcclxuICAgICAgICAkcGFuZSA9ICR0LmZpbmQoJy50YWItcGFuZScpLFxyXG4gICAgICAgICRuZXh0ID0gJHQuZmluZCgnLmJ0bi1uZXh0JyksXHJcbiAgICAgICAgJGJhY2sgPSAkdC5maW5kKCcuYnRuLWJhY2snKTtcclxuXHJcbiAgICAgICRuZXh0LmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJHRhcmdldCA9ICRlbC5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICRlbC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkbmF2LmZpbmQoJy5uYXYtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICRuYXYuZmluZCgnLm5hdi1saW5rW2hyZWY9XCInICsgJHRhcmdldCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkcGFuZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkKCR0YXJnZXQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgICRiYWNrLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJHRhcmdldCA9ICRlbC5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICRlbC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkbmF2LmZpbmQoJy5uYXYtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICRuYXYuZmluZCgnLm5hdi1saW5rW2hyZWY9XCInICsgJHRhcmdldCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkcGFuZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkKCR0YXJnZXQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
