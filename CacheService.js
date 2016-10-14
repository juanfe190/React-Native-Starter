import RNFS from 'react-native-fs';
import md5 from 'blueimp-md5';
import imageCache from './src/cache/imageCache';


export default
class Cache 
{
	static image(url, success, options = {})
	{
		const filename = md5(url);
		imageCache.setOptions(options);
		imageCache.checkCache(filename).then((inCache)=>{
			if(!inCache || options.forceUpdate) return imageCache.createCache(url, options);
			return imageCache.recoverCache(url, options);

		}).then((uri) => {
			success(uri);
		});

	}
}



