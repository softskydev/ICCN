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

  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuICBmdW5jdGlvbiB0b1N2ZyhvYmopIHtcclxuICAgIHZhciAkaW1nID0gb2JqO1xyXG4gICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgIH1cclxuICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG4gICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgfSwgJ3htbCcpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGpRdWVyeSgnaW1nLnN2ZycpLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgdG9TdmcoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdCA9IGpRdWVyeSh0aGlzKSxcclxuICAgICAgICBzaXplID0gKHNlbGVjdC5kYXRhKCdzaXplJykgIT09IHVuZGVmaW5lZCkgPyBzZWxlY3QuZGF0YSgnc2l6ZScpIDogNDtcclxuXHJcbiAgICAgIHNlbGVjdC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgICAgbGl2ZVNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLicsXHJcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeSgnLmRhdGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGRhdGUgPSBqUXVlcnkodGhpcyksXHJcbiAgICAgICAgaW5wdXQgPSBkYXRlLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0LmRhdGVwaWNrZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuYywgMjAwKTtcclxuXHJcbiAgICAkKFwiI3dyYXBcIikuYWRkQ2xhc3MoXCJsb2FkLXBhZ2VcIik7XHJcbiAgfSBpbml0KCk7XHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgJCgnLnNpZGViYXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkdG9nZ2xlID0gJHQuZmluZCgnLnNpZGViYXJfX3RvZ2dsZScpO1xyXG5cclxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHQudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
