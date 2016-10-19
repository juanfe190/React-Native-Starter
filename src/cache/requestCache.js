import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import {AsyncStorage} from 'react-native';
import http from '../../HttpService';
import util from './util';


const dir = RNFS.DocumentDirectoryPath;

async function recoverCache(url, params, options){
	const key = md5(url + JSON.stringify(params) + JSON.stringify(options));

	try {

	  var value = await AsyncStorage.getItem('@cache:' + key);
	  value = JSON.parse(value);
	  
	  if(util.expired(value.timestamp, value.expire)) return createCache(url, params, options);
	  return value.response;

	} catch (error) {
	  console.log("Error recovering cache" ,error);
	}
}



/**
* Agrega el archivo a cache tanto en fisico como en
*
* @author Felix Vasquez, Baum Digital
*/
async function createCache(url, params, options){
	const key = md5(url + JSON.stringify(params) + JSON.stringify(options));
	const timestamp = new Date().getTime();
	
	//Make request
	var response = await http.request(url, params, options);

	try{
	 	await AsyncStorage.setItem('@cache:' + key,  JSON.stringify({url: url, 
	  							  				 				  payload: params, 
	  							  				 				  timestamp: timestamp,
	  							  				 				  response: response,
	  							  				 				  expire: options.expire || 86400000,
	  							  				 				  options: options}));
	 	return response;
	}catch(err){
		console.log("Error saving to storage", err.message);
	}
	  
}






export default {
	recoverCache,
	createCache
};
