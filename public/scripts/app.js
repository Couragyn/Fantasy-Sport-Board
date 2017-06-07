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
  // Scripts for creating a league
  $('.startType').change(function() {
    if ($('input[value="DateTime"]').is(':checked')){
      $('#date').removeClass("hide");
    } else {
      $('#date').addClass("hide");
    }
  });
});
