import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import imageCache from './src/cache/imageCache';
import requestCache from './src/cache/requestCache';
import util from './src/cache/util';


export default
class Cache 
{
	/**
	* Cacheo de imagenes
	*
	* @author Felix Vasquez, Baum Digital
	*/
	static async image(url, options = {})
	{
		const filename = md5(url);
		let inCache = await util.checkCache(filename);

		if(!inCache || options.forceUpdate) return await imageCache.createCache(url, options);
		return await imageCache.recoverCache(url, options);

	}



	/**
	* Cacheo de http request
	*
	* @author Felix Vasquez, Baum Digital
	*/
	static async request(url, params = {}, options)
	{
		const key = md5(url + JSON.stringify(params) + JSON.stringify(options));

		let inCache = await util.checkCache(key);
		
		if(!inCache || options.forceUpdate) return await requestCache.createCache(url, params, options);
		return await requestCache.recoverCache(url, params, options);
	}
}



