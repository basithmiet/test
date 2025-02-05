
addDatePicker() {
  setTimeout(() => {
    var self = this;    
    (function () {
      var elements = document.getElementsByClassName('date-field');
      console.log(elements);
      if (elements && elements.length > 0) {
        for (var i = 0; i < elements.length; i++) {
          var id = elements[i].id; // Get the ID correctly
          $('#' + id).datepicker({
            dateFormat: "mm/dd/yy",
            appendTo: "body"
          });
          $('#' + id).datepicker('setDate', ''); // Corrected method
          $("body").on("change", "#" + id, function () {
            console.log(id);
            $('#' + id).trigger("click");
          });
          $('#' + id).on("change", function (dp) {
            var value = dp.currentTarget.value;
            console.log(id, value);
          });
        }
      }
    })();
  });
}
