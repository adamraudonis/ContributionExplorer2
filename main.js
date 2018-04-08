function initializeVizAndMenu(raceType) {

  $("#selection_list").empty();

  initialize(raceType);

  // Remove all children of the glossy menu generated div
  $('#glossyid').children().remove()

  if (raceType == "pres") {
      $("#glossyid").css("display","none");
  } else {
      $("#glossyid").css("display","block");
  }

  generateCommitteeHTML(raceType);
}

function ResetDisplay() {

  var raceTypeVar = "pres";
  if($('#house').hasClass('active')) {
    raceTypeVar = "house";
  } else if($('#senate').hasClass('active')) {
    raceTypeVar = "senate";
  } else {
    raceTypeVar = "pres";
  }

  d3.select("svg").remove();
  var svg = d3.select("body")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", 1100)
    .attr("height", 900);
  initializeVizAndMenu(raceTypeVar);
}
