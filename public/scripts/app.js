$(document).ready(function() {

  // Scripts for creating a league
  $('.leagueType').change(function() {
    if ($('input[value="Keeper"]').is(':checked')){
      $('#keeper').removeClass("hide");
    } else {
      $('#keeper').addClass("hide");
    }
  });
});
