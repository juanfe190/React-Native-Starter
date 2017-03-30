import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import imageCache, {buildKeyHash} from './src/cache/imageCache';
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
		let returning = null;
		const filename = buildKeyHash(url);

		let inCache = await util.checkCache(filename);

		if(!inCache || options.forceUpdate) returning = await imageCache.createCache(url, options);
		else returning = await imageCache.recoverCache(url, options);

		return returning;
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