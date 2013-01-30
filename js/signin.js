$(document).ready(function () {
    $('.active-links').click(function () {
        //Conditional states allow the dropdown box appear and disappear 
          if ($('#signin-dropdown').is(":visible")) {
              $('#signin-dropdown').hide()
        $('#session').removeClass('active'); // When the dropdown is not visible removes the class "active"
          } else {
              $('#signin-dropdown').show()
        $('#session').addClass('active'); // When the dropdown is visible add class "active"
          }
        return false;
      });
               //     Allow to hide the dropdown box if you click anywhere on the document.
      $('#signin-dropdown').click(function(e) {
      e.stopPropagation();
      });
      $(document).click(function() {
          $('#signin-dropdown').hide();
        $('#session').removeClass('active');
      });
    });          