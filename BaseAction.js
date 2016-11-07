import AppDispatcher from './FluxDispatcher';
export default 
class BaseAction{
	constructor() {
	  
	}
	static callAction(action){
		function stopInterval(){
			clearInterval(interval);
		}
		var interval = setInterval(()=>{
			if(!AppDispatcher.isDispatching()) 
			{
				AppDispatcher.dispatch(action);
				stopInterval();
			}
		}, 50);	
	}
}