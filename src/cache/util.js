import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import {AsyncStorage} from 'react-native';

/**
* Revisa si el archivo ya se encuentra almacenado en cache
*
* @author Felix Vasquez, Baum Digital
*/
async function checkCache(name){
	try {

	  const value = await AsyncStorage.getItem('@cache:' + name);
	  return value !== null;

	} catch (error) {
	  console.log(error);
	}
}




/**
* Valida si ya expiro el cache
*
* @author Felix Vasquez, Baum Digital
*/
function expired(time, expire){
	var current = new Date().getTime();
	return (current - time) > expire;
}


/**
 * Valida si la url actual ya se encuentra en proceso de cache
 * @param  {String} url             
 * @param  {Array} activeImageUrls Urls activas
 * @return {Boolean}                 
 */
function urlIsActive(url, activeImageUrls){
	return activeImageUrls.indexOf(url) > -1;
}



export default {
	checkCache,
	expired,
	urlIsActive
}