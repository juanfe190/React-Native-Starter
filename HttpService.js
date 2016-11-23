import httpUtil from './src/http/util';
import {HttpException, NetworkException} from './exceptions/HttpException';
import {ERROR_MESSAGES} from './src/http/constants';

var _interceptors = [];

export default
class http 
{
	static async request(url, payload, options)
	{
		try{
			let data = runRequestInterceptorsStack(url, payload, options);
			var response = await httpUtil.request(data.url, options.method, payload, options.headers);

			

		}catch(err){
			if(err.name == 'InterceptorRejected') return err.payload;
			throw new NetworkException(err.message, payload);
		}
		
		try{
			var payload = await response.json();
		}catch(err){}

		let result = runResponseInterceptorsStack(payload, response, options);
		if(String(response.status).charAt(0) != 2) throw new HttpException( ERROR_MESSAGES.HTTP_ERROR, response.status, payload, payload );
		
		return result;
	}


	static pushInterceptor(interceptor){
		_interceptors.push(interceptor);
	}
}


function runRequestInterceptorsStack(url, payload, options)
{
	//Copy array
	let interceptors = _interceptors.slice();
	if(options.interceptors) interceptors = interceptors.concat(options.interceptors);

	interceptors.forEach((interceptorObj, index) => {
		let interceptor = new interceptorObj({url, payload, options});
		return interceptor.request(url, payload, options);
	});

	return {url, payload, options};
}


function runResponseInterceptorsStack(response, raw, options)
{
	//Copy array
	let interceptors = _interceptors.slice();
	if(options.interceptors) interceptors = interceptors.concat(options.interceptors);

	interceptors.forEach((interceptorObj, index) => {
		let interceptor = new interceptorObj({response});
		return interceptor.response(response, raw);
	});

	return response;
}