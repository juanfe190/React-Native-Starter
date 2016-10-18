import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import imageCache from './src/cache/imageCache';


export default
class Cache 
{
	static async image(url, options = {})
	{
		const filename = md5(url);
		imageCache.checkCache(filename).then((inCache)=>{
			if(!inCache || options.forceUpdate) return imageCache.createCache(url, options);
			return imageCache.recoverCache(url, options);

		}).then((uri) => {
			return uri;
		});

	}
}



