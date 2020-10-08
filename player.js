//url for jsonp
let url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';
//set a script elemnt to get the jsonp data
var s = document.createElement("script");
s.src = url;
document.body.appendChild(s);
//global. 
var currentTip;
var tipList;

//callback function
function __5szm2kaj(jsonpObj) {
  //check for correct
  console.log('Request Good')  
  console.log(jsonpObj);
  //set tip list as global.
  tipList = jsonpObj.data.structure.steps;
  currentTip = 1;
  //add the css style and default tip
  AddStyleToHtml(jsonpObj);
  setTheDivDefaultTip(jsonpObj.data.tiplates.tip);
  //set buttons
  setButtons();
  //set first tip
  setTip(currentTip);

}

function setTheDivDefaultTip(rawTip) {
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
}

function AddStyleToHtml(jsonpObj) {
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
  //get the new tip data by id
  var currentTipData = getTipData(tipIndex);
  //if nothing found
  if(currentTipData == null) {
    console.log("No such tip in index: ", tipIndex);
    return;
  }
  currentTip = tipIndex;
  //set tip contant, and steps display
  document.getElementsByClassName("popover-content")[0].firstChild.innerHTML = currentTipData.action.contents["#content"];
  document.getElementsByClassName("steps-count")[0].firstElementChild.innerText = currentTipData.action.stepOrdinal;
  document.getElementsByClassName("steps-count")[0].lastElementChild.innerText = tipList.length - 1;
}

function nextButton() {
  var currentTipData = getTipData(currentTip);
  //if next step is to close
  if(currentTipData.followers[0].next == "eol0") closeYana();
  //if next setp is a number, update current tip
  else{
    currentTip = currentTipData.followers[0].next;
    setTip(currentTip);
  }
}

function closeYana() {
  console.log("stop the program tips")
  document.getElementById("TipsForGoogle").remove();
  }
  

function backButtonYana() {
  //find previus tip
  var prevTip = null;
  var nextTip = tipList[0];
  while(nextTip.id != currentTip){
    console.log(prevTip, nextTip, currentTip);
    prevTip = nextTip.id;
    nextTip = getTipData(nextTip.followers[0].next);
  }
  //disable button
  //if current tip is the first
  if(prevTip == null) return;
  //enable button+set the tip
  setTip(prevTip);
}
//get tip data by its id. if no such tip return null
function getTipData(tipId){
  for(var i = 0; i < tipList.length;i++){
    if(tipList[i].id == tipId) return tipList[i];
  }
  return null;
}
