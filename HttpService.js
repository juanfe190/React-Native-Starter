import httpUtil from './src/http/util';
import {HttpException, NetworkException} from './exceptions/HttpException';
import {ERROR_MESSAGES} from './src/http/constants';

export default
class http 
{
	static async request(url, params, options)
	{
		let isConnected = await httpUtil.validateInternetConnection();
		isConnected = true; //DEBUG
		if(!isConnected) throw new NetworkException( ERROR_MESSAGES.NO_CONNECTION );

		try{

			var response = await httpUtil.request(url, options.method, params, options.headers);

		}catch(err){
			throw new NetworkException(err.message, params);
		}
		
		try{
			var payload = await response.json();
		}catch(err){}

		if(response.status != 200) throw new HttpException( ERROR_MESSAGES.HTTP_ERROR, response.status, params, payload );
		return payload;
	}
}