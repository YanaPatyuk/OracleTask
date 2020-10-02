
//url for jsonp
let url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';
//set a script elemnt to get the jsonp data
var s = document.createElement("script");
s.src =url;
document.body.appendChild(s);


function __5szm2kaj(myObj) {
  console.log('Request Good')  
  console.log(myObj)  
  console.log(myObj.data.css)
  //create style elemnt to add css info
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = myObj.data.css
  document.head.appendChild(styleSheet)
}