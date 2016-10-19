/**
* Funcion default de react, pra mostrar RedBox
*/
var reactErrorHandler = global.ErrorUtils.getGlobalHandler();


global.ErrorUtils.setGlobalHandler((error)=>{
  console.log("Error capturado por react native starter");
  reactErrorHandler(error);
});