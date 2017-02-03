import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import {AsyncStorage} from 'react-native';
import util from './util';


const dir = RNFS.DocumentDirectoryPath;

async function recoverCache(url){
	const filename = md5(url);

	try {

	  var value = await AsyncStorage.getItem('@cache:' + filename);
	  value = JSON.parse(value);
	  
	  if(util.expired(value.timestamp, value.expire)) return createCache(url, {expire: value.expire});
	  if(! await RNFS.exists(value.path)) return createCache(url, {expire: value.expire});
	  return buildUri(value.path);

	} catch (error) {
	  console.log("Error recovering cache" ,error);
	}
}

function setOptions(_options){
	options = _options;
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
* Agrega el archivo a cache tanto en fisico como en
*
* @author Felix Vasquez, Baum Digital
*/
async function createCache(url, options){
	const extension = extractExtension(url);
	const filename = md5(url);
	const timestamp = new Date().getTime();
	const destination = `${dir}/${filename}.${extension}`;
	try {

	  let valid = await downloadAndWrite(url, destination, options);
	  if(valid){
	  	 await AsyncStorage.setItem('@cache:' + filename,  JSON.stringify({path: destination, 
	  							  				 						timestamp: timestamp, 
	  							  				  						expire: options.expire || 86400000}));
	  }

	  return valid;
	  
	} catch (error) {
	  console.log("Error saving to storage", error);
	}
}


function downloadProgress(options, data){
	var percentage = Math.floor((data.bytesWritten/data.contentLength) * 100);
  	if(options.onProgress) options.onProgress(percentage);
}


/**
* Descarga y graba en disco un archivo
*
* @author Felix Vasquez, Baum Digital
*/
async function downloadAndWrite(url, destination, options){
	try{
		let exists = await RNFS.exists(destination);
		if(exists) await RNFS.unlink(destination);

		let result = await RNFS.downloadFile({fromUrl: url, toFile: destination, progress: downloadProgress.bind(this, options)}).promise;
		
		if(result.statusCode < 200 || result.statusCode > 299) return false;
		return buildUri(destination);

	}catch(err){
		console.log("Error downloading file", err);
		return false;
	}
}


function buildUri(path){
	return {uri: 'file://' + path};
}


export default {
	recoverCache,
	createCache,
	setOptions
};