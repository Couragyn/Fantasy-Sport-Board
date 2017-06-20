$(document).ready(function() {

  // Scripts for creating a league
  $('.leagueType').change(function() {
    if ($('input[value="Keeper"]').is(':checked')){
      $('#keeper').removeClass("hide");
    } else {
      $('#keeper').addClass("hide");
    }
  });

  // Scripts for creating a draft
  $('.startType').change(function() {
    if ($('input[value="DateTime"]').is(':checked')){
      $('#date').removeClass("hide");
    } else {
      $('#date').addClass("hide");
    }
  });

  $("#confirmPassword").keyup(validate);

});

function validate() {
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
 
    if(password == confirmPassword) {
       $("#validate-status").text("Passwords match!");        
    }
    else {
        $("#validate-status").text("Passwords do not match");  
    }
    
}
