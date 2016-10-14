/**
* Funcion default de react, pra mostrar RedBox
*/
var reactErrorHandler = global.ErrorUtils.getGlobalHandler();


export default
class ErrorInterceptor
{
	static onGlobalError(callback){
		global.ErrorUtils.setGlobalHandler((error, isFatal)=>{
		  if(typeof callback !== 'function') throw new TypeError(`Parameter given to onGlobalError must be a valid function. '${typeof callback}' given.`);
		  
		  callback(error);
		  reactErrorHandler(error, isFatal);
		});
	}
}