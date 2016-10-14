import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import {AsyncStorage} from 'react-native';


const dir = RNFS.DocumentDirectoryPath;
var options;

async function recoverCache(url){
	const filename = md5(url);

	try {

	  var value = await AsyncStorage.getItem('@cache:' + filename);
	  value = JSON.parse(value);
	  
	  if(expired(value.timestamp, value.expire)) return createCache(url);
	  return buildUri(value.path);

	} catch (error) {
	  console.log("Error recovering cache" ,error);
	}
}

function setOptions(_options){
	options = _options;
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
* Obtiene la extension del archivo
*
* @author Felix Vasquez, Baum Digital
*/
function extractExtension(url){
	return (/[.]/.exec(url)) ? /[^.]+$/.exec(url)[0] : undefined;
}


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
* Agrega el archivo a cache tanto en fisico como en
*
* @author Felix Vasquez, Baum Digital
*/
async function createCache(url){
	const extension = extractExtension(url);
	const filename = md5(url);
	const timestamp = new Date().getTime();
	const destination = `${dir}/${filename}.${extension}`;
	try {

	  await AsyncStorage.setItem('@cache:' + filename,  JSON.stringify({path: destination, 
	  							  				 						timestamp: timestamp, 
	  							  				  						expire: options.expire || 86400000}));

	  return await downloadAndWrite(url, destination);

	} catch (error) {
	  console.log("Error saving to storage", error);
	}
}


function uploadProgress(data){
	var percentage = Math.floor((data.bytesWritten/data.contentLength) * 100);
  	if(options.onProgress) options.onProgress(percentage);
}


/**
* Descarga y graba en disco un archivo
*
* @author Felix Vasquez, Baum Digital
*/
async function downloadAndWrite(url, destination){
	try{

		await RNFS.downloadFile({fromUrl: url, toFile: destination, progress: uploadProgress});
		return buildUri(destination);

	}catch(err){
		console.log("Error downloading file", err);
	}
}


function buildUri(path){
	return {uri: 'file://' + path};
}


export default {
	checkCache,
	recoverCache,
	createCache,
	setOptions
};
