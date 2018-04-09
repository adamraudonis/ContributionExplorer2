var pi = Math.PI;
var main_r = 300;
var main_x = 500
var main_y = 400
var all_sectors = new Array();
var sector_count = 0;
var max_sector = 0;
var y_correction = 50;
var x_correction = 0;
var whois_reps_toselect = new Array();
var race_type = "house";

var idNameMap = Object();

var default_cand_opacity = 1;

var nameList = new Array();
var contributorList = "";

var contributions = new Array();

var seed = 1;

function initialize(congress, raceType) {
  var data = get_data(congress, raceType)
  all_sectors = new Array();
  sector_count = 0;
  max_sector = 0;
  nameList.length = 0;
  var sectorCodeDict = {
    "A":"Agribusiness",
    "B":"Comm./Electronics",
    "C":"Construction",
    "D":"Defense",
    "E":"Energy/Nat. Resources",
    "F":"Finance/Insur/Estate",
    "H":"Health",
    "K":"Lawyers / Lobbyists",
    "M":"Transport",
    "N":"Misc. Business",
    "Q":"Ideology/Single Issue",
    "P":"Labor",
    "W":"Other",
    "Y":"Unknown",
    "Z":"Adminstrative Use"
  };

  var canvas = d3.select("#canvas");
        
  var colors = [
    "#e37e23",
    "#619f3a",
    "#4876b1",
    "#c36929",
    "#8dd3c7",
    "#E6E65C",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "fccde4",
    "#d9d9d9",
    "#bc80bd",
    "#ccebc6",
    "#ffed6f"
  ]
  
  var colors_assigned = new Array();

  var sector_x = 0;
  var sector_y = 0;

  var selection = canvas.selectAll("circle").data(data);

  canvas.append("svg:circle")
    .attr("cx", main_x)
    .attr("cy", main_y)
    .attr("r", main_r)
    .attr("id", "main_circle")
    .style("display", "block")
    .style("fill","white")
    .style("opacity",0.0001)
    .attr("class","test")
        
  selection.enter().append("circle")

  canvas.append("svg:circle")
    .attr("cx", main_x)
    .attr("cy", main_y)
    .attr("r", main_r)
    .attr("id", "main_circle_outline")
    .style("fill","none")
    .style("stroke","grey")
    .style("stroke-width", 1)
    
  selection.attr("cx", main_x)
    .attr("cy", main_y)
    .attr("r", 20)
    .attr("party", function(d) { return d.Party; })
    .attr("id", function(d) {
      if (d.CID == undefined) {
        return "no id"
      } else {
        idNameMap["candidate_" + d.CID] = "";
        return ("candidate_" + d.CID)
      }
    })
    .attr("class", "candidate cand_unlocked")
    .attr("candidateName", function (d) {
      idNameMap["candidate_" + d.CID] = d.Name.toLowerCase()
      nameList.push(d.Name)
      return d.Name
    })
    .attr("title", function(d) {
      if (d.Twitter != "") {
        return "<div class='candtip'>"+d.Name+"<br /><a href='http://www.Twitter.com/"+d.Twitter+"' target='_blank'><img src='images/Twitter.png' width=\"25\" height = \"25\"/></a></div>";
      } else {
        return "<div class='candtip'>"+d.Name+"<br /></div>";
      }
    })
    .style("fill", function(d) {
      var party = d.Party;
      if (party == "D") { 
        return "blue"
      } else if (party == "R") { 
        return "red"
      } else {
        return "green"
      }
    })
    .attr("total_cash",function(d) {
      var total = 0;
      for(var j in d.SectorTotals) {
      
        var sector = d.SectorTotals[j]
        total = total + sector
        
        var old_sector = all_sectors[j]
        if (old_sector == undefined) {
          all_sectors[j] = 0;
          sector_count++;
        }
        all_sectors[j] = all_sectors[j] + sector
      }
      return total
    })
    .on("mouseover", function(d, i){
                
      $(this).css("fill", "#FFFAAA")
      var id = $(this).attr('id');
      var el = document.getElementById(id);
      el.ownerSVGElement.appendChild(el);
    })
    .on("mouseout", function(d, i){
        var party = this.getAttribute("party");        
        if (party == "R") {
          $(this).css("fill", "red");
        } else if (party == "D") {
          $(this).css("fill", "blue");
        } else {
          $(this).css("fill", "green");
        }
    })
    .on("click", function(d, i){
        var id = $(this).attr('id');
        SocialMediaData(id);
        var sarr = new Array();
        sarr.push(id.substring(10));
        select_cand_ids(sarr);
    })

    var i = 0;   
    for (var j in all_sectors){
      
      colors_assigned[j] = colors[i]
      
      if (all_sectors[j] > max_sector) {
        max_sector = all_sectors[j]
      }
      i++
    }    
            
    // Create sectors
    var i = 0;
    var anchor_angle = 0;
    var x = 0;
    var y = 0;
    var bar_size = 0;
    var d = "";
    var angle_segment = sector_count;
      
    for (var j in all_sectors) {
    
      bar_size = 15 + all_sectors[j] / max_sector * 100
      anchor_angle = i / angle_segment * 2 * pi;
      x = main_x + main_r * Math.cos(anchor_angle)
      y = main_y + main_r * Math.sin(anchor_angle)

      d = "M"+x+" "+y+ " l"+bar_size*Math.cos(anchor_angle)+ " "  + bar_size*Math.sin(anchor_angle) 
      
      canvas.append("svg:path")
        .attr("d", d)
        .attr("class","sector_bar")
        .attr("id", "sector_bar_"+j)
        .attr("sector_name", j)
        .attr("size", bar_size)
        .style("stroke", colors_assigned[j])
        .on("mousedown", function(){  
          
          motion_lock(this)
        })
        
      // TODO: these are not used but deleting them breaks the code.
      canvas.append("svg:circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .style("display", "none")
        .attr("class", "sector_circle")
        .attr("theta", anchor_angle)
        .attr("id", "sector_"+j)
        .attr("sector_name", j)
        .on("mousedown", function(){  
          motion_lock(this)
        })  

      var sectorName = j;
      if (sectorCodeDict[j]) {
        sectorName = sectorCodeDict[j];
      };

      canvas.append("svg:text")
        .text(sectorName)
        .attr("class","sector_bar_text")
        .attr("x",x)
        .attr("y",y)
        .attr("id", "sector_bar_text_"+j)
        .attr("sector_name", j)
        .attr("size", bar_size)
        .style("stroke", "#fffff")
        .style("-webkit-touch-callout", "none")
        .style("-webkit-user-select", "none")
        .style("-khtml-user-select", "none")
        .style("-moz-user-select", "none")
        .style("-ms-user-select", "none")
        .style("user-select", "none")
        .on("mousedown", function(){  
          motion_lock(this)
        })
        .attr("text-anchor", function() { 
          if (anchor_angle < Math.PI/2 || anchor_angle > 3 * Math.PI/2) {
            return "start";
          }
          else {
            return "end";
          };
        });
         
        i++
      }

      var candidates = $(".candidate");
        
      for (var i = 0; i < candidates.length; i++){
        
        var id = $(candidates[i]).attr("id")
        var totalCash = $(candidates[i]).attr("total_cash")
        
        // Make sure we don't include candidates that have no money
        // coming from any sectors.
        //if (totalCash > 0) {
        draw_candidates(id, canvas, colors_assigned, false)
        //}; 
       }

      for (var i = 0; i < candidates.length; i++){       
        
        // Bring candidate circles above vectors 
        var id = $(candidates[i]).attr("id")
        var totalCash = $(candidates[i]).attr("total_cash")

        // Make sure we don't include candidates that have no money
        // coming from any sectors.
        //if (totalCash > 0) {
        var el = document.getElementById(id)
        el.parentNode.appendChild(el)           
        //}; 
      }

      mouse_tracker(canvas, colors_assigned)
         
  // Hack to make the WHO IS REP lookup work even from the pres page.
  if (whois_reps_toselect.length > 0) {
    select_cand_ids(whois_reps_toselect);
  };
  whois_reps_toselect = new Array();
    
  run_qtip();  
  // setTimeout(function(){run_qtip()},100);
}


function SocialMediaData(id) {
  var candidate = d3.select(id);
}

function run_qtip() {
  $('.candidate').qtip({
    show: { 
      when: { 
        event: 'mouseover' 
      }
    },
    hide: {
      when: {
        event: 'mouseout' 
      }, 
      delay: 1000
    },
    corner: {
      target: 'bottomLeft',
      tooltip: 'bottomLeft'
    },
    style: { 
      name: 'light',
      border: {
        width: 2,
        radius: 2,
        color: '#000099'
      },
      width: 140
    } 
  })
}

function candCallBack(data){
  contributions.length = 0;
  for (var j in data) {
    contributions.push(j);
  }
}

// Returns a random integer between min and max
// http://stackoverflow.com/questions/10134237/
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw_candidates(candidate_id, canvas, colors_assigned, redraw) {
 
  var candidate = d3.select("#" + candidate_id)
  
  //code for each candidate          
  //spring constant for one candidate     
  //calculate x,y

  var candidate_x = 0;
  var candidate_y = 0;
  var sum_k = 0;
  var sum_force_x = 0;
  var sum_force_y = 0;

  var pull_offset = 70;

  var x_i = 0
  var y_i = 0
  var k_i = 0

  if (candidate.attr("total_cash") > 0) {
    sum_k = candidate.attr("total_cash")
  }

  if (sum_k != 0) {
   
    var candidate_sectors = candidate[0][0]["__data__"]["SectorTotals"];
    for (var j in candidate_sectors) {

      var sector = $("#sector_" + j)
      var sector_name = j

      x_i = main_x + (main_r - pull_offset) * Math.cos(sector.attr("theta"))
      y_i = main_y + (main_r - pull_offset) * Math.sin(sector.attr("theta"))
      k_i = parseInt(candidate_sectors[j])

      sum_force_x = sum_force_x + k_i * x_i
      sum_force_y = sum_force_y + k_i * y_i
    }

    candidate_x = sum_force_x / sum_k;
    candidate_y = sum_force_y / sum_k;

    //force vectors
    var delta_x = 0;
    var delta_y = 0;
    var m = 0;

    var max_stroke_width = 15;
    var d = "";
    var tension_fraction = 0;

    candidate.attr("r", 20 + sum_k / (20 * 100000))

    var i = 0;
    for (var j in candidate_sectors){

      sector = $("#sector_"+j)
      sector_name = j
      if (parseInt(candidate_sectors[j]) > 0){
        k_i = parseInt(candidate_sectors[j])
      } else {
        k_i = 0;
      }

      x_i = main_x + main_r * Math.cos(sector.attr("theta"))
      y_i = main_y + main_r * Math.sin(sector.attr("theta"))

      tension_fraction = k_i / sum_k;
      delta_x = x_i - candidate_x;
      delta_y = y_i - candidate_y
      m = delta_y / delta_x
      d = "M" + candidate_x + " " + candidate_y + " l" + delta_x + " " + delta_y;

      if (redraw == false) {
        //if (randomInt == 1) {
        canvas.append("svg:path")
          .attr("d",d)
          .attr("class","vector")
          .attr("id", "cand_"+candidate_id+"_vector_"+j)
          .style("stroke",colors_assigned[j])
          .style("stroke-width",0.3+0.7*(tension_fraction)*max_stroke_width)
          .style("opacity",function() {
            return 1 + 0 * tension_fraction;
          })
          .style("display",show_random_vectors(i))
        //}
      } else {
        $("#cand_" + candidate_id + "_vector_" + j).attr("d", d)
      }
      i++;
    }

    //end of force vectors
  } else {
    candidate_x = main_x;
    candidate_y = main_y;   
  }
  // end of calculate x,y for candidate
  //create candidate circles
  //var el=document.getElementById("candidate_"+candidate_id)
           
  candidate.attr("cx", parseFloat(candidate_x))
    .attr("cy", parseFloat(candidate_y))
                         
  //el.parentNode.appendChild(el)
  //end of create candidate circle
  //end of code for each candidat
  // setTimeout(function(){run_qtip()},900);
}

function mouse_tracker(canvas, colors_assigned) {

  var mouse_x = 0;
  var mouse_y = 0;
  var mouse_r = 0;
  
  var mie = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
  if (!mie) {
    // Specifies that you want all mouse movement events passed to the document
    document.captureEvents(Event.MOUSEMOVE); 
    document.captureEvents(Event.MOUSEDOWN);
    document.captureEvents(Event.MOUSEUP);
    document.captureEvents(Event.mouseover);
    document.captureEvents(Event.click);
  }  

  document.onmousemove = function(event){
     
    track_selection();
    var current_mouse_x = $("#mouse_x").html();
    var current_mouse_y = $("#mouse_y").html();
    
    mouse_x = event.pageX;
    mouse_y = event.pageY;

    $('#mouse_x').html(mouse_x);
    $('#mouse_y').html(mouse_y);

    var delta_xc = mouse_x - main_x - x_correction;
    var delta_yc = mouse_y - main_y - y_correction;
    var r = Math.sqrt(Math.pow(delta_xc,2) + Math.pow(delta_yc, 2))

    var theta = Math.acos(delta_xc / r)

    if (delta_yc < 0) {
      theta = 2 * Math.PI - theta;   
    }

    $("#theta").html(theta);
    $("#mouse_r").html(r);
     
    var target_name = "sector_" + $('#target').html();
    var new_x = 0;
    var new_y = 0;
    var d = "";

    if (target_name != "") {
       
      var target = $('#'+target_name);
      new_x = main_x + main_r * Math.cos(theta);
      new_y = main_y + main_r * Math.sin(theta);

      target.attr("cx", new_x);
      target.attr("cy", new_y);
      target.attr("theta", theta);

      var target_bar = $("#sector_bar_" + $('#target').html());
      var target_bar_size = target_bar.attr("size");
      d = "M" + new_x + " " + new_y + " l" + target_bar_size * Math.cos(theta) + " " + target_bar_size * Math.sin(theta)
      target_bar.attr("d", d)

      var target_bar_text = $("#sector_bar_text_" + $('#target').html())

      target_bar_text.attr("x", new_x)
      target_bar_text.attr("y", new_y)
      target_bar_text.attr("text-anchor", function() { 
        // var radians = data[i].radians
        if (theta < Math.PI/2 || theta > 3 * Math.PI/2) {
          return "start";
        }
        else {
          return "end";
        };
      })

      var candidates = $(".candidate");
      for (var i = 0; i < candidates.length; i++) {       

        var id = $(candidates[i]).attr("id")
        draw_candidates(id, canvas, colors_assigned, true)
      }
    }                                    
  };
                          
  document.onmousedown = function(){
    start_selection_rect()
  }
  
  document.onmouseup = function (event){
    $("#selection_rect").remove()
    if ($("#select_status").html() == 'true') {
      finish_selection()
    }
    $('#target').html("")
  }
}

function motion_lock(target) {

  $("#target").html($(target).attr("sector_name"))
}

function between(x, min, max) {

  return x > min && x < max;
}

function track_selection() {

  var select_status=$("#select_status").html();
  if (select_status=="true") {                                        
    var mouse_x = $("#mouse_x").html() - x_correction;
    var mouse_y = $("#mouse_y").html() - y_correction;

    var origin_x = $("#select_point_1_x").html();
    var origin_y = $("#select_point_1_y").html();

    var width = mouse_x - origin_x;
    var height = mouse_y - origin_y;

    var d = "M" + origin_x + " " + origin_y + " l" + width + " 0 l0 " + height + " h" + (-1 * width) + " 0 v0 " + (-1 * height)

    var selection_rect = d3.select("#selection_rect");
     
    selection_rect.attr("d", d);
  }              
}

function finish_selection() {
              
  $("#select_status").html("false");

  $("#selection_list").html("");
     
  var x_1 = $("#select_point_1_x").html();
  var x_2 = $("#mouse_x").html()-x_correction;
  var min_x = 0;
  var max_x = 0;

  if (x_1 < x_2) {
    min_x = x_1;
    max_x = x_2;
  } else {
    min_x = x_2;
    max_x = x_1;
  }

  //y_1 should have been already corrected
  var y_1 = $("#select_point_1_y").html();
  var y_2 = $("#mouse_y").html() - y_correction;
  var min_y = 0;
  var max_y = 0;
  
  if (y_1 < y_2) {
    min_y = y_1;
    max_y = y_2;
  } else {
    min_y = y_2;
    max_y = y_1;
  }
  
  var width = max_x - min_x;
  var height = max_y - min_y;
                                                  
  if(width < 2 || height < 2) {
    console.log("IN REMOVEEEE")
    //var vectorDisplay = $(".vector").css("display");
    //console.log(vectorDisplay);
    //var opacity = $(".candidate").css("opacity");   
    console.log("IN SELECT ALL CAND")
    console.log(opacity);

    if (race_type == "house") {
      var candidates = $(".candidate")
      
      for (var i = 0; i < candidates.length; i++) {
        var id = $(candidates[i]).attr("id");
        var opacity = $(candidates[i]).css("opacity");

        for (var sector in all_sectors) {
          var vector = $("#cand_" + id + "_vector_" + sector)
          
          vector.css("display",show_random_vectors(i))
        }
      }
    } else {
      $(".vector").css("display", "block")  
    }
    $(".candidate").css("opacity", 1)      
    $(".vector").css("opacity", 1)  
    $(".candidate").css("stroke", "black")
    console.log("IN PAST ALL CAND")

    remove_selection()
                  
  } else {

    var candidates = $(".candidate");
    var candidate = "";
    var cx=0, cy=0, cand_id="", name="", d3_candidate="";
    var div_function="";
    var reveal_count=0;

    $(".candidate").css("opacity", 0.1)
    $(".vector").css("opacity", 0.05)

    for (var i = 0; i < candidates.length; i++){

      candidate = $("#" + candidates[i].id)
      d3_candidate = d3.select("#" + candidates[i].id)
      cx = candidate.attr("cx")
      cy = candidate.attr("cy")
      cand_id = candidate.attr("id")
      name = d3_candidate[0][0]["__data__"]["Name"]
                                                                                                  
      if ((between(cx, min_x, max_x)) && (between(cy, min_y, max_y))) {
                                                                          
        reveal_count++;
        candidate.css("stroke", "orange");
        //candidate.css("stroke-width", 4)
        candidate.css("opacity", default_cand_opacity);
        candidate.attr("in_selection", "true");
              
        $("#selection_list").append("<div locked='false' onclick=lock_candidate(this) id=list_"+ cand_id+" for="+cand_id+" onmouseover=highlight_this(this) onmouseout=lowlight_this(this)>"+name+"</div>")
                                                   
        for (var j in all_sectors) {

          var vector = $("#cand_" + cand_id + "_vector_" + j)
          vector.css("opacity", 1)
          vector.css("display", "block")
        }   
      }
    } 
    if (reveal_count==0) {  
      //select_all_cand();
      remove_selection()
    }
  }    
}

function lock_candidate(target) {
  var candidate = "";
  if ($(target).attr("locked") == 'false') {
    $(target).attr("locked", 'true')
    $(target).attr("class", "locked_text")
    candidate = $(target).attr("for")
    
    $("#" + candidate).css("stroke", "#4900b6")
    $("#" + candidate).attr("class", "candidate cand_locked")
    $("#" + candidate).css("opacity", 1)
  } else {
    $(target).attr("locked", 'false')
    $(target).attr("class", "")
    candidate = $(target).attr("for")
    $("#" + candidate).attr("class", "candidate cand_unlocked")
    $("#" + candidate).css("opacity", 0.1)
  }
}

function highlight_this(target) {

  $(".cand_unlocked").css("opacity", 0.1)
  $(".vector").css("opacity", 0.05)

  var target_circle = $(target).attr("for")
  
  var el=document.getElementById(target_circle);
  el.ownerSVGElement.appendChild(el);
  $("#" + target_circle).css("fill", "#FFFAAA");

  var candidates=$(".cand_unlocked")
  
  var sectors = $("#" + target_circle)[0]["__data__"]["SectorTotals"]
  var cand_id = $("#" + target_circle).attr("id")
  for (var j in sectors) {
    $("#cand_" + cand_id + "_vector_" + j).css("opacity", 1) 
  }
 
  $("#" + target_circle).css("opacity", 1)
  
  if ($(target).attr("locked") == "true") {return;}
  
  $(target).attr("class", "highlighted_text")
}

function lowlight_this(target){

  var target_circle = $(target).attr("for");
  var circle = $("#"+target_circle);
  var party = circle[0]["__data__"]["Party"];
  //var party = circle.getAttribute("party");
  if (party == "R") {
    $("#"+target_circle).css("fill", "red")
  } else if (party == "D") {
    $("#"+target_circle).css("fill", "blue")
  } else {
    $("#"+target_circle).css("fill", "green")
  }

  var candidates = $(".candidate");
  var candidate = "";
  var sectors = "";

  for (var j = 0; j < candidates.length; j++){
      
    candidate = $("#"+candidates[j].id)

    if (candidate.attr("in_selection") == "true") {
      
      candidate.css("opacity", default_cand_opacity)
      
      sectors=candidate[0]["__data__"]["SectorTotals"]
      for (var m in sectors) {
        $("#cand_" + candidate.attr("id") + "_vector_" + m).css("opacity", 1)
      } 
    }
  }
  
  //$(".cand_unlocked").css("opacity", default_cand_opacity)
  
  if ($(target).attr("locked") == "true") {return;}

  $(target).attr("class", 'lowlighted_text')
}

function remove_selection(){
  // Goes back to state where no candidates were ever selected.
  // Clearing of selection_list occurs somewhere else. 
       
  $("#selection_rect").remove()
         
  $(".candidate").attr("in_selection", "false")
         
  $(".vector").css("opacity", 1)
  
  $(".cand_locked").attr("class", "candidate cand_unlocked")
   
  $(".candidate")
    .css("stroke", "black")
    .css("stroke-width", 1.5)
    .css("opacity", default_cand_opacity)

  var candidates = $(".candidate");
  var party="", id="", color="";  
}

function search_data(name) {
  name = name.toLowerCase()
  if (name.length > 0) {
            
    var candidates = $(".candidate")
    var candidate = "";
    var cx = 0;
    var cy = 0;
    var cand_id = "";
    var cidArray = new Array();

    for(var i = 0; i < candidates.length; i++){
      candidate = $("#"+candidates[i].id) 
      var cand_id = candidate.attr("id")
      var cand_name = idNameMap[cand_id].toLowerCase()
      if (cand_name.indexOf(name) != -1) {
        
        var index = cand_id.indexOf("_")
        var passID = cand_id.substring(index+1)
        cidArray.push(passID)
      }
    }
    select_cand_ids(cidArray);
  };
}

function select_cand_ids(cids) {
  // Grey out all candidates and vectors
  $(".candidate").css("opacity", 0.1)
  $(".vector").css("opacity", 0.05)
  $(".vector").css("display","none")

  for (var i = 0; i < cids.length; i++) {
    var cand_id = cids[i];
    $("#candidate_" + cand_id).css("opacity", 1)
    $("#candidate_" + cand_id).css("stroke", "white") //ff9912
    
    if ($("#candidate_" + cand_id).attr("id")) {
      var el=document.getElementById($("#candidate_" + cand_id).attr("id"))
      el.parentNode.appendChild(el)
    };
        
    for (var j in all_sectors) {
        
      var vector = $("#cand_candidate_" + cand_id + "_vector_" + j)
      vector.css("display","block")
      vector.css("opacity", 1)
    }
  };
}

function select_all_cand() {

  $("#selection_list").empty();

  //var vectorDisplay = $(".vector").css("display");
  //console.log(vectorDisplay);

  //var opacity = $(".candidate").css("opacity");   
  console.log("IN SELECT ALL CAND")
  console.log(opacity);

  if (race_type == "house") {
    var candidates = $(".candidate")
    var opacity_count = 0;
    for (var i = 0; i < candidates.length; i++) {
      var opacity = $(candidates[i]).css("opacity");
      if (opacity == 1) {
        opacity_count = opacity_count + 1;
      };
    }
    console.log(opacity_count);
    for (var i = 0; i < candidates.length; i++) {
      var id = $(candidates[i]).attr("id");
      var opacity = $(candidates[i]).css("opacity");

      for (var sector in all_sectors) {
        var vector = $("#cand_" + id + "_vector_" + sector)
        if (opacity_count > 400) {

        } else {
          vector.css("display", show_random_vectors(i))
        }
      };
    };
  } else {
    $(".vector").css("display", "block")  
  }
  $(".candidate").css("opacity", 1)      
  $(".vector").css("opacity", 1)  
  $(".candidate").css("stroke", "black")
}

function show_random_vectors(i) {

  // function random() {
  //     var x = Math.sin(seed++) * 10000;
  //     return x - Math.floor(x);
  // }
  //var randomInt = (Math.random()*100)

  // console.log(random())

  // console.log(i)
  return "block"

  // var randomInt = getRandomInt(0, 3);
  // if (random() < 0.3 || race_type != "house") {
  //   return "block";
  // } else {
  //   return "none";
  // }
}

function start_selection_rect() {
    
  var mouse_x = $("#mouse_x").html() - x_correction;
  var mouse_y = $("#mouse_y").html() - y_correction;
  
  var delta_x = mouse_x - main_x;
  var delta_y = mouse_y - main_y;
  var length_squared = Math.pow(delta_x, 2) + Math.pow(delta_y, 2);
  
  if (length_squared > Math.pow(main_r, 2)) { return "" }
  
  var canvas = d3.select("#canvas");
  
  remove_selection();
        
  $("#select_status").html("true");

  var width = 1;
  var height = 1;

  var d = "M" + mouse_x + " " + mouse_y + " l" + width + " 0 l0 " + height + " h-" + width + " 0 v0 -" + height

  canvas.append("svg:path")
    .attr("id","selection_rect")
    .attr("d",d)
  
  $("#select_point_1_x").html(mouse_x)
  $("#select_point_1_y").html(mouse_y)
}

// function initialize(congress, raceType) {

//   // The filename is the racetype: pres, senate, or house.
//   jsonCallback()
// }


// function contributor(cid){
//   //nameList = new Array();
//   console.log('http://www.stanford.edu/~gdykho/cgi-bin/candCallback'+cid+'.json&jsonp=candCallback')
//   $(document).ready(function(){
//       $.ajax({
//           type: 'get',
//           url: 'http://www.stanford.edu/~gdykho/cgi-bin/callback/'+cid+'.json&jsonp=candCallback',
//           dataType: 'jsonp',
//           success: candCallBack
//       });
//      }) 
// }

// function getNames() {
//   return nameList
// }