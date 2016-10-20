export default
class HttpInterceptor
{
	constructor(data){
		this.url = data.url;
		this.payload = data.payload;
		this.options = data.options;

		this.responsePayload = data.response;
	}

	continue(){
		return {url: this.url, payload: this.payload, options: this.options, response: this.responsePayload};
	}

	abort(payload = {}){
		throw {name: 'InterceptorRejected', payload: payload}
	}
}