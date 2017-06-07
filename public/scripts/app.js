$(document).ready(function() {

  // Scripts for creating a league
  $('.leagueType').change(function() {
    if ($('input[value="Keeper"]').is(':checked')){
      $('#keeper').removeClass("hide");
    } else {
      $('#keeper').addClass("hide");
    }
  });

  $.ajax({
    url: 'route/action/',
    type: 'POST',
    data: 'your form data',
    success: function(response){
      alert('get outta here with my eye holes');
    }
  }); 

});
