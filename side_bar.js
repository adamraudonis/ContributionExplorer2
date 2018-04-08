
/***********************************************
* Accordion Content script- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
* Visit http://www.dynamicDrive.com for hundreds of DHTML scripts
* This notice must stay intact for legal use
***********************************************/

// Callback for tapping the menu committees
function getCom(committee_id) {
  $("#selection_list").empty();

  $.ajax({
    type: 'get',
    url: 'http://services.sunlightlabs.com/api/committees.get.json?apikey=de9c6b058ea542a4a5aab1d845d56c83&id=' + committee_id + '&jsonp=comdetails_callback',
    dataType: 'jsonp',
    success: comdetails_callback 
  });
}

function comdetails_callback(jsonData) {

  var cidArray = new Array();
  var members = jsonData.response.committee.members;

  for (var i = 0; i < members.length; i++) {
    var legislator = members[i].legislator;
    cidArray.push(legislator.crp_id);
  };
  select_cand_ids(cidArray);
}

function generateCommitteeHTML(raceType) {

  var obj;
  if (raceType == "senate") {
    obj = get_senate_list();
  } else {
    obj = get_house_list();
  }

  obj = obj.response;
     
  for (f = 0; f < obj.committees.length; f++) {
    var a = document.createElement ("a");
    a.setAttribute("href",'javascript:getCom(\"'+obj.committees[f].committee.id+'\")');
    a.setAttribute("id",obj.committees[f].committee.id);
    var committeename = obj.committees[f].committee.name;
    var firstsubstring = committeename.substring(0,19)
    if (raceType == "senate") {
      if (firstsubstring == "Senate Committee on") {
        committeename = committeename.substring(20)
      } else if (firstsubstring == "Senate Select Commi") {
        committeename = committeename.substring(27)
      } else if (firstsubstring == "Senate Special Comm") {
        committeename = committeename.substring(27)
      } else if (firstsubstring == "Senate Commission on") {
        committeename = committeename.substring(21)
      }
    } else {
      if (firstsubstring == "House Committee on ") {
        committeename = committeename.substring(19)
      } else if (firstsubstring == "House Permanent Sel") {
        committeename = committeename.substring(35)
      }
    }
    
    committeename = committeename.substring(0,38)

    a.appendChild (document.createTextNode (committeename));

    if (obj.committees[f].committee.subcommittees) {
      a.setAttribute("class","menuitem submenuheader");
      document.getElementsByClassName("glossymenu")[0].appendChild(a);

      var subcommittees = obj.committees[f].committee.subcommittees;
      var div = document.createElement ("div");
      div.setAttribute("class","submenu");
      var ul = document.createElement("ul");
      
      for (var i = subcommittees.length - 1; i >= 0; i--) {
        var subcommittee = subcommittees[i];
        var sub_li = document.createElement ("li");
        var sub_a = document.createElement ("a");
        sub_a.setAttribute("href",'javascript:getCom(\"' + subcommittee.committee.id + '\")');
        sub_a.setAttribute("class","subcl");
        sub_a.appendChild (document.createTextNode (subcommittee.committee.name));
        sub_li.appendChild(sub_a);
        ul.appendChild(sub_li);
      }
      div.appendChild(ul);
      document.getElementsByClassName("glossymenu")[0].appendChild(div);
    } else {
      a.setAttribute("class","menuitem");
      document.getElementsByClassName("glossymenu")[0].appendChild(a);
    }
  }

  // NOTE: I did this fricken crazy generation because
  // the ddaccordion does not work in a function and if you
  // just have it outside when you clear the div because you are
  // switching senate/house the + signs disappear.
  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = 'accordianinit.js';
  headID.appendChild(newScript);
}