import AppDispatcher from './FluxDispatcher.js';
import {EventEmitter} from 'events';

const ChangeEvent = 'change';

export default
class BaseStore extends EventEmitter
{
	constructor(){
		super();
		AppDispatcher.register((action)=>{
			if(typeof this[action.actionType] === 'function') this[action.actionType](action.payload); 
		});
	}

	addChangeListener(callback){
		this.on(ChangeEvent, callback);
	}

	removeChangeListener(callback){
		this.removeListener(ChangeEvent, callback);
	}

	emitChange(){
		this.emit(ChangeEvent);
	}

	getState(){
		return this.state;
	}

	setState(props){
		this.state = Object.assign({}, this.state, props);
		this.emitChange();
	}
}