//url for jsonp
let url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';
//set a script elemnt to get the jsonp data. when data loaded, call __5szm2kaj funcion
var s = document.createElement("script");
s.src = url;
document.head.appendChild(s);


//global. 
var currentTip; //current id tip
var tipList; //steps list
var jsonpObject;//the object recived from server

/**
 * This is callback function from url.
 * It's initializing the tips on the page and global obj
 * @param {*} jsonpObj  the data recived from server as json
 */
function __5szm2kaj(jsonpObj) {
  //initiate
  jsonpObject = jsonpObj;
  //check if there are errors-if so return
  if(jsonpObject.error) {
    console.log("There are errors in the recived data from server");
    return;
  }
  //set tip list as global.
  tipList = jsonpObj.data.structure.steps;
  //set first step
  currentTip = tipList[0].id;
  //add the css style and default tip
  AddStyleToHtml(jsonpObj);
  //set first tip
  setTip(currentTip);

}
/**
 * Add style elemnt with the css in the head
 */
function AddStyleToHtml() {
  //create style elemnt to add css info on head
  var styleElemnt = document.createElement('style');
  var cssStyleRaw = jsonpObject.data.css; //get the raw style
  styleElemnt.setAttribute("type", "text/css"); //set the type
  //get the head to append
  var headElemnt = document.getElementsByTagName('head')[0];
  headElemnt.appendChild(styleElemnt);
  //this is relevent for different browsers
  if (styleElemnt.styleSheet) {   // IE
      styleElemnt.styleSheet.innerHTML = cssStyleRaw;
  } else {                // the world
    var tt1 = document.createTextNode(cssStyleRaw);
    styleElemnt.appendChild(tt1);
  }
}

//set current tip for display. input:index of tip
/**
 * Set tip/step on the page.
 * @param {} tipIndex - new tip to set
 */
function setTip(tipIndex) {
  //get the new tip data by id
  var currentTipData = getTipData(tipIndex);
  //if nothing found means no sutch tip
  if(currentTipData == null) {
    console.log("No such tip id: ", tipIndex);
    return;
  }
  currentTip = tipIndex;
  //place defailt tip on the page.
  setTheDivDefaultTip();
  //set  the buttons
  setButtons();
  //set classes to current step.
  addClasses(currentTipData);
  //set contant of the step.
  setContantOfTip(currentTipData);
  //if there is next attribute, means user should press something
  if(currentTipData.next != null) setNextEventSelector();

}

/**
 * Add class to the div elemnts.
 * @param {} currentTipData 
 */
function addClasses(currentTipData){
  //set classes to current step.
  //I assume panel-container is most relevent from example
  var tipclasses = "panel-container tooltip in " + currentTipData.action.placement;
  //if there are classes to add from the tip data-add them to the default tip
  if(currentTipData.action.classes)
    tipclasses = tipclasses + " " + currentTipData.action.classes;
  document.getElementById("TipsForGoogle").firstChild.className = tipclasses;
}
/**
 * Set contant of the step and the current step count.
 * Note: i assume its cuttent tip/total tip.
 * @param {} currentTipData 
 */
function setContantOfTip(currentTipData) {
  //set tip contant, and steps display
  document.getElementsByClassName("popover-content")[0].firstChild.innerHTML = currentTipData.action.contents["#content"];
  document.getElementsByClassName("steps-count")[0].firstElementChild.innerText = currentTipData.action.stepOrdinal;
  document.getElementsByClassName("steps-count")[0].lastElementChild.innerText = tipList.length - 1;//last tip is exit
}

/**
 * Create new div elemnt with sttip class and add the deafult tip to it.
 * Set its id so we can find and delete it later.
 * @param {} rawTip 
 */
function setTheDivDefaultTip(rawTip = jsonpObject.data.tiplates.tip) {
  //first-create tooltip div class witch will contain the tip.
  var divToolTip = document.createElement("div");
  //set sttip class
  divToolTip.classList.add("sttip");
  //set the raw html string tip
  divToolTip.innerHTML = rawTip;
  divToolTip.id = "TipsForGoogle";
  //add the tool-tip -append to body html.
  //getElemntBySelector(getTipData(currentTip).action.selector).parentElement.after(divToolTip);
  //getElemntBySelector(getTipData(currentTip).action.selector).parentElement.after(divToolTip);
  document.body.appendChild(divToolTip);
}

/**
 * Set the buttons function.
 */
function setButtons() {
  document.getElementsByClassName("next-btn")[0].href = "javascript:nextBt();";
  document.getElementsByClassName("prev-btn default-prev-btn")[0].setAttribute( "onclick", "backBt()" );
  document.getElementsByClassName("popover-title")[0].firstElementChild.setAttribute("onclick", "closeBt()");
  document.getElementsByClassName("default-later-btn")[0].setAttribute("onclick", "laterButton()");
  //set text of buttons
  setBtnText();
}

/**
 * set role text
 * Assume that role refers to data-iridize-role
 * And Assume there is only nextBt.
 * If there are more changes, function should change. 
 */
function setBtnText(){
  var tipData =  getTipData(currentTip);
  if(tipData==null) return;
  if(tipData.action.roleTexts.nextBt)
    document.querySelector("[data-iridize-role=\"nextBt\"]").text = tipData.action.roleTexts.nextBt;
}

/**
 * Next button function.
 * It close current step and sets the next one.
 */
function nextBt() {
  var currentTipData = getTipData(currentTip);
  if(currentTipData == null) return;
   currentTip = currentTipData.followers[0].next;
   closeBt();

  //if next step is to close
  if(currentTip == "eol0"){
    alert("This End!");
    return;
  } else //any other case-go next step
    setTip(currentTip);
}

/**
 * Back button.
 * Find previus step that called current one, and close current step
 */
function backBt() {
  //find previus tip
  var prevTip = null;
  var nextTip = tipList[0];
  while(nextTip.id != currentTip){
    prevTip = nextTip.id;
    nextTip = getTipData(nextTip.followers[0].next);
  }
  //if current tip is the first
  if(prevTip == null) return;
  //set the new tip anc cluse current one
  closeBt();
  setTip(prevTip);
}
/**
 * Remove current step from web
 */
function closeBt() {
  document.getElementById("TipsForGoogle").remove();
}
/**
 * Didnt know what to do with later...
 * If i had a server, i would update it where the user stoped.
 */
function laterButton() {
  alert("Reminder: Do not postpone tomorrow what can be done now");
}

/**
 * The selctor.
 * In css3 "contain" does not appear any more-see:
 * https://www.w3.org/TR/selectors-3/#content-selectors
 * I didnt find any other way to get to the text so i "cheated" with the images.
 * This function returns an elemnt by selector query.
 * if no souch query it will write on console.
 * @param {*} selectorString 
 */
function getElemntBySelector(selectorString) {
  var element;
  try {
    //try get the elemnt
    element =  document.querySelector(selectorString);
  }
  catch(err) {
    console.log("This selector string not wrong:",selectorString );
    if(selectorString == ".gb_g:contains(\"Images\")"){
      element = document.querySelectorAll(".gb_g")[1];
      if (element==null) element = document.querySelectorAll(".gb_g")[0];//it may be in 0 too
    }
    else element = null;
  }
  return element;
}
/**
 * Set an even that calles to next step function.
 * It stops ant other linkes to start
 * note: i didnt changed it back after current step ended.
 */
function setNextEventSelector() {
  var currentTipData = getTipData(currentTip);
  var selector = getElemntBySelector(currentTipData.next.selector);
  if(selector!= null) {
    //set event to next button function.
    selector.setAttribute("on" + currentTipData.next.event, "nextBt()");
    selector.href = "#";
  }
}

/**
 * Get the tip data from tip list by id.
 * @param {} tipId 
 */
function getTipData(tipId){
  for(var i = 0; i < tipList.length;i++){
    if(tipList[i].id == tipId) return tipList[i];
  }
  return null;
}