var oldValue = document.getElementById('search').value;
var currentView = null;

$(document).ready(function(){
  $("#search").keyup(function(){
    // Retrieve the input field text and reset the count to zero
    var search = $(this).val();
    $("#selection_list").empty()
    search.toLowerCase()
    search_data(search);
  });

  $("#search").click(function(){
      return false;
  });
});

$(function() {
  var names = nameList; // Defined in functions.js // getNames();

  var thing = $( "#search" ).autocomplete({
      width: 320,
      source: names,
      messages: {
        noResults: "",
        results: function() {}
      },  
      select: function( event, ui ) {
        event.preventDefault();
      }
  });

  $('#search').keypress(function(e){
    if (e.which == 13) {
      return false;
    }
    // if (e.which == 13) e.preventDefault();
  });

  var renderItem = thing.data("autocomplete")._renderItem;
  /* Override the _renderItem function to display the placeholder item */
  thing.data("autocomplete")._renderItem = function(ul, item) {
    return $("<li class=\"ui-menu-item\"></li>")
      .data("ui-menu-item", item)
      .append("<a>" + item.value + "</a>")
      .appendTo(ul);
  };
});

function checkSearch() {
  var searchBar = document.getElementById('search');
  var searchTerm = document.getElementById('search').value;
  if (searchTerm.length == 0 || searchTerm == "Search...") {

  } else {
    console.log("The search term " + searchTerm)
    search_data(searchTerm);
  }
}
$(document).ready(function() {
  $('a.ui-corner-all').click(function(e) {
    e.preventDefault();
  });
});

function OnSubtreeModified () {
  var searchTerm = document.getElementById('search').value;
  if (searchTerm.length > 0) {
    console.log("The search term " + searchTerm)
    search_data(searchTerm);
  }
}
document.getElementById('search').addEventListener(Event.CHANGE, checkSearch, false);

setInterval(function() {
  var searchBar = document.getElementById('search');
  var searchTerm = document.getElementById('search').value;
  if ((searchTerm.length > 0 && oldValue != searchTerm )|| search.valueOf() === "Search...") {
    var anchors = document.getElementsByTagName('a')
    for (var i = 0; i < anchors.length + anchors.length; i++ ) {
      var anchor = ( i < anchors.length ) ? anchors[i] : anchors[i-anchors.length];
      anchor.addEventListener("click", OnSubtreeModified, false);
    }   
    console.log("The search term " + searchTerm)
    oldValue = searchTerm;
    search_data(searchTerm);
  }
}, 100);

// Popover code ------------------------

// Close the popover by tapping anywhere
// http://stackoverflow.com/questions/8947749/
var isVisible = false;
var clickedAway = false;

$('#zippopover').popover({
  html: true,
  trigger: 'manual'
}).click(function(e) {
  $(this).popover('show');
  $('#zip').focus();
  clickedAway = false
  isVisible = true
  e.preventDefault()
});

// Must be placed here. Can't be inside the document click function.
function whoisrep_callback(jsonData){
  if (jsonData.response.legislators.length > 0) {

    // TODO handle multiple reps per zip code.
    // if (jsonData.response.legislators.length > 3) {
    //     alert("Multiple reps found for that zip code. Try entering your full zip such as 91361-2038");
    // };

    // Special case for the district that stanford is in because
    // the current rep lost and we are showing future reps.
    var crpid = jsonData.response.legislators[0].legislator.crp_id;
    if (crpid == "N00007364") {
        crpid = "N00029649";
    };
    
    // Switch to Rep. View if not in it already
    if(!$('#house').hasClass('active')) {
      $('#house').button('toggle');
      d3.select("svg").remove();
      var svg = d3.select("body").append("svg")
                .attr("id", "canvas")
                .attr("width", 1100)
                .attr("height", 900);
      whois_reps_toselect.push(crpid);
      initializeVizAndMenu("house");
    } else {
      var oneArray = new Array();
      oneArray.push(crpid);
      select_cand_ids(oneArray);
    }
  } else {
    alert("A representative for that zipcode could not be found.");
  };
}

// For closing the popover and clicking submit
$(document).click(function(e) {

  // If you press the submit button
  if (e.target.id == "zipbutton") {
    $(document).ready(function(){
      $.ajax({
          type: 'get',
          url: 'http://services.sunlightlabs.com/api/legislators.allForZip?apikey=de9c6b058ea542a4a5aab1d845d56c83&zip='+ $('#zip').val() +'&jsonp=whoisrep_callback',
          dataType: 'jsonp',
          success: whoisrep_callback 
      });
    })
  }

  // Don't close if you are touching the zip textfield
  if (e.target.id != "zip") {
    var clickedClass = e.target.getAttribute("class");
                                 console.log(clickedClass)

    if (clickedClass != "candidate cand_unlocked" && clickedClass != "subcl" && clickedClass != "menuitem" && clickedClass != "sector_bar" &&  clickedClass != "test") {
      $("#search").attr("value", "");
      console.log("IN SELECTION");
      select_all_cand();
    };

    if(isVisible & clickedAway) {
      $('#zippopover').popover('hide')
      isVisible = clickedAway = false
    }
    else {
      clickedAway = true
    }
  };
});