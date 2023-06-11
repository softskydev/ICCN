$("#filer_input").filer({
  limit: null,
  maxSize: null,
  extensions: null,
  changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"></div><div class="jFiler-input-text"><span class="title">Drag or drop files here, or Browse</span><span class="desc">Only PDF and DOC File with max size of 10mb each files</span></div></div>',
  showThumbs: true,
  theme: "dragdropbox",
  templates: {
    box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
    item: '<li class="jFiler-item">\
          <div class="jFiler-item-container">\
            <div class="jFiler-item-inner">\
              <div class="jFiler-item-thumb">\
                <div class="jFiler-item-status"></div>\
                <div class="jFiler-item-thumb-overlay">\
                  <div class="jFiler-item-info">\
                    <div style="display:table-cell;vertical-align: middle;">\
                      <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
                      <span class="jFiler-item-others">{{fi-size2}}</span>\
                    </div>\
                  </div>\
                </div>\
                {{fi-image}}\
              </div>\
              <div class="jFiler-item-assets jFiler-row">\
                <ul class="list-inline pull-left">\
                  <li>{{fi-progressBar}}</li>\
                </ul>\
                <ul class="list-inline pull-right">\
                  <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                </ul>\
              </div>\
            </div>\
          </div>\
        </li>',
    itemAppend: '<li class="jFiler-item">\
            <div class="jFiler-item-container">\
              <div class="jFiler-item-inner">\
                <div class="jFiler-item-thumb">\
                  <div class="jFiler-item-status"></div>\
                  <div class="jFiler-item-thumb-overlay">\
                    <div class="jFiler-item-info">\
                      <div style="display:table-cell;vertical-align: middle;">\
                        <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
                        <span class="jFiler-item-others">{{fi-size2}}</span>\
                      </div>\
                    </div>\
                  </div>\
                  {{fi-image}}\
                </div>\
                <div class="jFiler-item-assets jFiler-row">\
                  <ul class="list-inline pull-left">\
                    <li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
                  </ul>\
                  <ul class="list-inline pull-right">\
                    <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                  </ul>\
                </div>\
              </div>\
            </div>\
          </li>',
    progressBar: '<div class="bar"></div>',
    itemAppendToEnd: false,
    canvasImage: true,
    removeConfirmation: true,
    _selectors: {
      list: '.jFiler-items-list',
      item: '.jFiler-item',
      progressBar: '.bar',
      remove: '.jFiler-item-trash-action'
    }
  },
  dragDrop: {
    dragEnter: null,
    dragLeave: null,
    drop: null,
    dragContainer: null,
  },
  uploadFile: {
    url: "./php/ajax_upload_file.php",
    data: null,
    type: 'POST',
    enctype: 'multipart/form-data',
    synchron: true,
    beforeSend: function () { },
    success: function (data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {
      var parent = itemEl.find(".jFiler-jProgressBar").parent(),
        new_file_name = JSON.parse(data),
        filerKit = inputEl.prop("jFiler");

      filerKit.files_list[id].name = new_file_name;

      itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function () {
        $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
      });
    },
    error: function (el) {
      var parent = el.find(".jFiler-jProgressBar").parent();
      el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
        $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
      });
    },
    statusCode: null,
    onProgress: null,
    onComplete: null
  },
  files: null,
  addMore: false,
  allowDuplicates: true,
  clipBoardPaste: true,
  excludeName: null,
  beforeRender: null,
  afterRender: null,
  beforeShow: null,
  beforeSelect: null,
  onSelect: null,
  afterShow: null,
  onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
    var filerKit = inputEl.prop("jFiler"),
      file_name = filerKit.files_list[id].name;

    $.post('./php/ajax_remove_file.php', { file: file_name });
  },
  onEmpty: null,
  options: null,
  dialogs: {
    alert: function (text) {
      return alert(text);
    },
    confirm: function (text, callback) {
      confirm(text) ? callback() : null;
    }
  },
  captions: {
    button: "Choose Files",
    feedback: "Choose files To Upload",
    feedback2: "files were chosen",
    drop: "Drop file here to Upload",
    removeConfirmation: "Are you sure you want to remove this file?",
    errors: {
      filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
      filesType: "Only Images are allowed to be uploaded.",
      filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
      filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
    }
  }
}); 
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmaWxlLXVwbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiI2ZpbGVyX2lucHV0XCIpLmZpbGVyKHtcclxuICBsaW1pdDogbnVsbCxcclxuICBtYXhTaXplOiBudWxsLFxyXG4gIGV4dGVuc2lvbnM6IG51bGwsXHJcbiAgY2hhbmdlSW5wdXQ6ICc8ZGl2IGNsYXNzPVwiakZpbGVyLWlucHV0LWRyYWdEcm9wXCI+PGRpdiBjbGFzcz1cImpGaWxlci1pbnB1dC1pbm5lclwiPjxkaXYgY2xhc3M9XCJqRmlsZXItaW5wdXQtaWNvblwiPjwvZGl2PjxkaXYgY2xhc3M9XCJqRmlsZXItaW5wdXQtdGV4dFwiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj5EcmFnIG9yIGRyb3AgZmlsZXMgaGVyZSwgb3IgQnJvd3NlPC9zcGFuPjxzcGFuIGNsYXNzPVwiZGVzY1wiPk9ubHkgUERGIGFuZCBET0MgRmlsZSB3aXRoIG1heCBzaXplIG9mIDEwbWIgZWFjaCBmaWxlczwvc3Bhbj48L2Rpdj48L2Rpdj4nLFxyXG4gIHNob3dUaHVtYnM6IHRydWUsXHJcbiAgdGhlbWU6IFwiZHJhZ2Ryb3Bib3hcIixcclxuICB0ZW1wbGF0ZXM6IHtcclxuICAgIGJveDogJzx1bCBjbGFzcz1cImpGaWxlci1pdGVtcy1saXN0IGpGaWxlci1pdGVtcy1ncmlkXCI+PC91bD4nLFxyXG4gICAgaXRlbTogJzxsaSBjbGFzcz1cImpGaWxlci1pdGVtXCI+XFxcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJqRmlsZXItaXRlbS1jb250YWluZXJcIj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0taW5uZXJcIj5cXFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqRmlsZXItaXRlbS10aHVtYlwiPlxcXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0tc3RhdHVzXCI+PC9kaXY+XFxcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqRmlsZXItaXRlbS10aHVtYi1vdmVybGF5XCI+XFxcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpGaWxlci1pdGVtLWluZm9cIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OnRhYmxlLWNlbGw7dmVydGljYWwtYWxpZ246IG1pZGRsZTtcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqRmlsZXItaXRlbS10aXRsZVwiPjxiIHRpdGxlPVwie3tmaS1uYW1lfX1cIj57e2ZpLW5hbWV9fTwvYj48L3NwYW4+XFxcclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiakZpbGVyLWl0ZW0tb3RoZXJzXCI+e3tmaS1zaXplMn19PC9zcGFuPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICB7e2ZpLWltYWdlfX1cXFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpGaWxlci1pdGVtLWFzc2V0cyBqRmlsZXItcm93XCI+XFxcclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxpc3QtaW5saW5lIHB1bGwtbGVmdFwiPlxcXHJcbiAgICAgICAgICAgICAgICAgIDxsaT57e2ZpLXByb2dyZXNzQmFyfX08L2xpPlxcXHJcbiAgICAgICAgICAgICAgICA8L3VsPlxcXHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LWlubGluZSBwdWxsLXJpZ2h0XCI+XFxcclxuICAgICAgICAgICAgICAgICAgPGxpPjxhIGNsYXNzPVwiaWNvbi1qZmktdHJhc2ggakZpbGVyLWl0ZW0tdHJhc2gtYWN0aW9uXCI+PC9hPjwvbGk+XFxcclxuICAgICAgICAgICAgICAgIDwvdWw+XFxcclxuICAgICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICA8L2xpPicsXHJcbiAgICBpdGVtQXBwZW5kOiAnPGxpIGNsYXNzPVwiakZpbGVyLWl0ZW1cIj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0tY29udGFpbmVyXCI+XFxcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0taW5uZXJcIj5cXFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpGaWxlci1pdGVtLXRodW1iXCI+XFxcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpGaWxlci1pdGVtLXN0YXR1c1wiPjwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqRmlsZXItaXRlbS10aHVtYi1vdmVybGF5XCI+XFxcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0taW5mb1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqRmlsZXItaXRlbS10aXRsZVwiPjxiIHRpdGxlPVwie3tmaS1uYW1lfX1cIj57e2ZpLW5hbWV9fTwvYj48L3NwYW4+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqRmlsZXItaXRlbS1vdGhlcnNcIj57e2ZpLXNpemUyfX08L3NwYW4+XFxcclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgICAge3tmaS1pbWFnZX19XFxcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiakZpbGVyLWl0ZW0tYXNzZXRzIGpGaWxlci1yb3dcIj5cXFxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LWlubGluZSBwdWxsLWxlZnRcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzcz1cImpGaWxlci1pdGVtLW90aGVyc1wiPnt7ZmktaWNvbn19PC9zcGFuPjwvbGk+XFxcclxuICAgICAgICAgICAgICAgICAgPC91bD5cXFxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LWlubGluZSBwdWxsLXJpZ2h0XCI+XFxcclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgY2xhc3M9XCJpY29uLWpmaS10cmFzaCBqRmlsZXItaXRlbS10cmFzaC1hY3Rpb25cIj48L2E+PC9saT5cXFxyXG4gICAgICAgICAgICAgICAgICA8L3VsPlxcXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICA8L2xpPicsXHJcbiAgICBwcm9ncmVzc0JhcjogJzxkaXYgY2xhc3M9XCJiYXJcIj48L2Rpdj4nLFxyXG4gICAgaXRlbUFwcGVuZFRvRW5kOiBmYWxzZSxcclxuICAgIGNhbnZhc0ltYWdlOiB0cnVlLFxyXG4gICAgcmVtb3ZlQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgX3NlbGVjdG9yczoge1xyXG4gICAgICBsaXN0OiAnLmpGaWxlci1pdGVtcy1saXN0JyxcclxuICAgICAgaXRlbTogJy5qRmlsZXItaXRlbScsXHJcbiAgICAgIHByb2dyZXNzQmFyOiAnLmJhcicsXHJcbiAgICAgIHJlbW92ZTogJy5qRmlsZXItaXRlbS10cmFzaC1hY3Rpb24nXHJcbiAgICB9XHJcbiAgfSxcclxuICBkcmFnRHJvcDoge1xyXG4gICAgZHJhZ0VudGVyOiBudWxsLFxyXG4gICAgZHJhZ0xlYXZlOiBudWxsLFxyXG4gICAgZHJvcDogbnVsbCxcclxuICAgIGRyYWdDb250YWluZXI6IG51bGwsXHJcbiAgfSxcclxuICB1cGxvYWRGaWxlOiB7XHJcbiAgICB1cmw6IFwiLi9waHAvYWpheF91cGxvYWRfZmlsZS5waHBcIixcclxuICAgIGRhdGE6IG51bGwsXHJcbiAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICBlbmN0eXBlOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICBzeW5jaHJvbjogdHJ1ZSxcclxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCBpdGVtRWwsIGxpc3RFbCwgYm94RWwsIG5ld0lucHV0RWwsIGlucHV0RWwsIGlkKSB7XHJcbiAgICAgIHZhciBwYXJlbnQgPSBpdGVtRWwuZmluZChcIi5qRmlsZXItalByb2dyZXNzQmFyXCIpLnBhcmVudCgpLFxyXG4gICAgICAgIG5ld19maWxlX25hbWUgPSBKU09OLnBhcnNlKGRhdGEpLFxyXG4gICAgICAgIGZpbGVyS2l0ID0gaW5wdXRFbC5wcm9wKFwiakZpbGVyXCIpO1xyXG5cclxuICAgICAgZmlsZXJLaXQuZmlsZXNfbGlzdFtpZF0ubmFtZSA9IG5ld19maWxlX25hbWU7XHJcblxyXG4gICAgICBpdGVtRWwuZmluZChcIi5qRmlsZXItalByb2dyZXNzQmFyXCIpLmZhZGVPdXQoXCJzbG93XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiPGRpdiBjbGFzcz1cXFwiakZpbGVyLWl0ZW0tb3RoZXJzIHRleHQtc3VjY2Vzc1xcXCI+PGkgY2xhc3M9XFxcImljb24tamZpLWNoZWNrLWNpcmNsZVxcXCI+PC9pPiBTdWNjZXNzPC9kaXY+XCIpLmhpZGUoKS5hcHBlbmRUbyhwYXJlbnQpLmZhZGVJbihcInNsb3dcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgdmFyIHBhcmVudCA9IGVsLmZpbmQoXCIuakZpbGVyLWpQcm9ncmVzc0JhclwiKS5wYXJlbnQoKTtcclxuICAgICAgZWwuZmluZChcIi5qRmlsZXItalByb2dyZXNzQmFyXCIpLmZhZGVPdXQoXCJzbG93XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiPGRpdiBjbGFzcz1cXFwiakZpbGVyLWl0ZW0tb3RoZXJzIHRleHQtZXJyb3JcXFwiPjxpIGNsYXNzPVxcXCJpY29uLWpmaS1taW51cy1jaXJjbGVcXFwiPjwvaT4gRXJyb3I8L2Rpdj5cIikuaGlkZSgpLmFwcGVuZFRvKHBhcmVudCkuZmFkZUluKFwic2xvd1wiKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc3RhdHVzQ29kZTogbnVsbCxcclxuICAgIG9uUHJvZ3Jlc3M6IG51bGwsXHJcbiAgICBvbkNvbXBsZXRlOiBudWxsXHJcbiAgfSxcclxuICBmaWxlczogbnVsbCxcclxuICBhZGRNb3JlOiBmYWxzZSxcclxuICBhbGxvd0R1cGxpY2F0ZXM6IHRydWUsXHJcbiAgY2xpcEJvYXJkUGFzdGU6IHRydWUsXHJcbiAgZXhjbHVkZU5hbWU6IG51bGwsXHJcbiAgYmVmb3JlUmVuZGVyOiBudWxsLFxyXG4gIGFmdGVyUmVuZGVyOiBudWxsLFxyXG4gIGJlZm9yZVNob3c6IG51bGwsXHJcbiAgYmVmb3JlU2VsZWN0OiBudWxsLFxyXG4gIG9uU2VsZWN0OiBudWxsLFxyXG4gIGFmdGVyU2hvdzogbnVsbCxcclxuICBvblJlbW92ZTogZnVuY3Rpb24gKGl0ZW1FbCwgZmlsZSwgaWQsIGxpc3RFbCwgYm94RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuICAgIHZhciBmaWxlcktpdCA9IGlucHV0RWwucHJvcChcImpGaWxlclwiKSxcclxuICAgICAgZmlsZV9uYW1lID0gZmlsZXJLaXQuZmlsZXNfbGlzdFtpZF0ubmFtZTtcclxuXHJcbiAgICAkLnBvc3QoJy4vcGhwL2FqYXhfcmVtb3ZlX2ZpbGUucGhwJywgeyBmaWxlOiBmaWxlX25hbWUgfSk7XHJcbiAgfSxcclxuICBvbkVtcHR5OiBudWxsLFxyXG4gIG9wdGlvbnM6IG51bGwsXHJcbiAgZGlhbG9nczoge1xyXG4gICAgYWxlcnQ6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgIHJldHVybiBhbGVydCh0ZXh0KTtcclxuICAgIH0sXHJcbiAgICBjb25maXJtOiBmdW5jdGlvbiAodGV4dCwgY2FsbGJhY2spIHtcclxuICAgICAgY29uZmlybSh0ZXh0KSA/IGNhbGxiYWNrKCkgOiBudWxsO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2FwdGlvbnM6IHtcclxuICAgIGJ1dHRvbjogXCJDaG9vc2UgRmlsZXNcIixcclxuICAgIGZlZWRiYWNrOiBcIkNob29zZSBmaWxlcyBUbyBVcGxvYWRcIixcclxuICAgIGZlZWRiYWNrMjogXCJmaWxlcyB3ZXJlIGNob3NlblwiLFxyXG4gICAgZHJvcDogXCJEcm9wIGZpbGUgaGVyZSB0byBVcGxvYWRcIixcclxuICAgIHJlbW92ZUNvbmZpcm1hdGlvbjogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIHRoaXMgZmlsZT9cIixcclxuICAgIGVycm9yczoge1xyXG4gICAgICBmaWxlc0xpbWl0OiBcIk9ubHkge3tmaS1saW1pdH19IGZpbGVzIGFyZSBhbGxvd2VkIHRvIGJlIHVwbG9hZGVkLlwiLFxyXG4gICAgICBmaWxlc1R5cGU6IFwiT25seSBJbWFnZXMgYXJlIGFsbG93ZWQgdG8gYmUgdXBsb2FkZWQuXCIsXHJcbiAgICAgIGZpbGVzU2l6ZTogXCJ7e2ZpLW5hbWV9fSBpcyB0b28gbGFyZ2UhIFBsZWFzZSB1cGxvYWQgZmlsZSB1cCB0byB7e2ZpLW1heFNpemV9fSBNQi5cIixcclxuICAgICAgZmlsZXNTaXplQWxsOiBcIkZpbGVzIHlvdSd2ZSBjaG9vc2VkIGFyZSB0b28gbGFyZ2UhIFBsZWFzZSB1cGxvYWQgZmlsZXMgdXAgdG8ge3tmaS1tYXhTaXplfX0gTUIuXCJcclxuICAgIH1cclxuICB9XHJcbn0pOyAiXSwiZmlsZSI6ImZpbGUtdXBsb2FkLmpzIn0=

//# sourceMappingURL=file-upload.js.map
