//url for jsonp
let url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';
//set a script elemnt to get the jsonp data
var s = document.createElement("script");
s.src = url;
document.body.appendChild(s);


//callback function
function __5szm2kaj(jsonpObj) {
  //check for correct
  console.log('Request Good')  
  console.log(jsonpObj) 

  //create style elemnt to add css info on head
  var ss1 = document.createElement('style');
  var cssStyleRaw = jsonpObj.data.css
  ss1.setAttribute("type", "text/css");
  var hh1 = document.getElementsByTagName('head')[0];
  hh1.appendChild(ss1);
  if (ss1.styleSheet) {   // IE
      ss1.styleSheet.innerHTML = cssStyleRaw;
  } else {                // the world
      var tt1 = document.createTextNode(cssStyleRaw);
      ss1.appendChild(tt1);
    }

    //ceate div elemnt for the tips
    var rawTip = jsonpObj.data.tiplates.tip;
    //get raw tip as html string.
    var rawTip = jsonpObj.data.tiplates.tip;
    var hoverTip = jsonpObj.data.tiplates.hoverTip; 
    //set tip list as global.
    tipList = jsonpObj.data.structure.steps;
    currentTip = 0;

    //first-create tooltip div class witch will contain the tip.
    var divToolTip = document.createElement("div");
    divToolTip.classList.add("tooltip");
    //set the raw html string tip
    divToolTip.innerHTML = rawTip;
    //create "father" div, witch contain the sttip class
    var divSttip= document.createElement("div");
    divSttip.id = "TipsForGoogle";
    divSttip.classList.add("sttip");
    //add the tool-tip as a child and append to bodt html.
    divSttip.appendChild(divToolTip);
    document.body.appendChild(divSttip);
    //set buttons
    setButtons();
    setTip(currentTip);

}
//set buttons functions
function setButtons() {
  document.getElementsByClassName("next-btn")[0].href = "javascript:nextButton();";
  document.getElementsByClassName("prev-btn default-prev-btn")[0].setAttribute( "onclick", "backButtonYana()" );
  document.getElementsByClassName("prev-btn default-prev-btn")[0].className = 'tooltip showPrevBt prev-btn default-prev-btn';
  document.getElementsByClassName("popover-title")[0].firstElementChild.setAttribute("onclick", "closeYana()");
}
//set current tip for display. input:index of tip
function setTip(tipIndex) {
  var currentTip = tipList[tipIndex];
  document.getElementsByClassName("popover-content")[0].firstChild.innerHTML = currentTip.action.contents["#content"];
  document.getElementsByClassName("steps-count")[0].firstElementChild.innerText = currentTip.action.stepOrdinal;
  document.getElementsByClassName("steps-count")[0].lastElementChild.innerText = tipList.length - 1;
}

function nextButton() {
  currentTip+=1;
  //if no tips left-close
  if(currentTip >= tipList.length - 1) closeYana();
  else{
    setTip(currentTip);
  }
}

function closeYana() {
  console.log("stop the program tips")
  document.getElementById("TipsForGoogle").remove();
  }
  

function backButtonYana() {
  if(currentTip == 0) return;
  currentTip -=1;
  setTip(currentTip);
}

