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

function searchPlayers(position) {
  var input, filter, table, tr, td, i, searchID;
  searchID = document.getElementById("search-"+position);
  input = searchID.value
  filter = input.toUpperCase();
  table = document.getElementById("table-"+position);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

