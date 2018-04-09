// On Load
$(function() {

  // Get the selected button in the button group when pressed.
  $("#raceTypeButtonGroup .btn").click(function() {
    if(!$(this).hasClass('active')) {
      var raceType = $(this).attr("id")
      ResetDisplay(null, raceType)
    }
  });

  $("#congressButtonGroup .btn").click(function() {
    if(!$(this).hasClass('active')) {
      var congress = $(this).attr("id")
      ResetDisplay(congress, null)
    }
  });

  // Select House view initially.
  $('#house').button('toggle');

  // Select year 2018 congress 115
  $('#115').button('toggle');

  ResetDisplay();
})

function ResetDisplay(congress, raceType) {

  d3.select("svg").remove();

  var svg = d3.select("body")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", 1100)
    .attr("height", 900);

  if (!raceType) {
    raceType = $("#raceTypeButtonGroup .btn.btn-small.active").attr("id");
  }

  if (!congress) {
    congress = $("#congressButtonGroup .btn.btn-small.active").attr("id");
  }

  
  $("#selection_list").empty();

  initialize(congress, raceType);

  // Remove all children of the glossy menu generated div
  $('#glossyid').children().remove()

  // Hide the side bar showing committees if looking
  // at the presidential race
  if (raceType == "pres") {
    $("#glossyid").css("display", "none");
  } else {
    $("#glossyid").css("display", "block");
  }

  generateCommitteeHTML(raceType);
}
