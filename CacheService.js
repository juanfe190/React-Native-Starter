import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import imageCache from './src/cache/imageCache';


export default
class Cache 
{
	static async image(url, options = {})
	{
		const filename = md5(url);

		try{
			let inCache = await imageCache.checkCache(filename);

			if(!inCache || options.forceUpdate) return await imageCache.createCache(url, options);
			return await imageCache.recoverCache(url, options);
		}catch(error){
			console.log(error);
		}

	}
}



