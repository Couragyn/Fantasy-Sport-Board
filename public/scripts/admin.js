$(document).ready(function() {

  var positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST', 'DL', 'LB', 'DB', 'DE', 'DT', 'CB', 'S'];

  for (i = 0; i < positions.length; i++) {
    $( "#sortable-"+positions[i] ).sortable({
      placeholder: "ui-state-highlight",
      cursor: 'crosshair',
      update: function(event, ui) {
        var thisPosit = $(this).attr("id").split('-')[1];
        var Order = $(this).sortable('toArray').toString();
        $('#order-'+thisPosit).val(Order);
      }
    });
    $( "#sortable-"+positions[i] ).disableSelection();
  }
  $( "#tabs" ).tabs();

});
