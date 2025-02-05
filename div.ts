$('#' + id).datepicker({
  dateFormat: "mm/dd/yy",
  appendTo: "body",
  beforeShow: function(input, inst) {
    setTimeout(function() {
      inst.dpDiv.css({
        top: $(input).offset().top + $(input).outerHeight(),
        left: $(input).offset().left
      });
    }, 0);
  }
});
