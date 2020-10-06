
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

    //ceate only one tip, to check
    var rawTip = jsonpObj.data.tiplates.tip;
    var hoverTip = jsonpObj.data.tiplates.hoverTip; 
    var currentTip = 0;
    var tipList = jsonpObj.data.structure.steps;

    //create div elemnt
    var divToolTip = document.createElement("div");
    //set clsaa to sttip
    divToolTip.classList.add("tooltip");
    divToolTip.innerHTML = SetTipData(rawTip,tipList[0]);
    
    var divSttip= document.createElement("div");
    divSttip.classList.add("sttip");
    divSttip.appendChild(divToolTip);
    document.body.appendChild(divSttip);


}

function SetTipData(rawDivFormat, tipData) {
  var finalDiv = "";
  console.log(tipData.action.contents['#content']);
  finalDiv = rawDivFormat.replace("data-iridize-id=\"content\">","data-iridize-id=\"content\">" + tipData.action.contents['#content']);

  return finalDiv;
}