export 
class HttpException extends Error
{
	/**
	* 
	* @params String: mensaje de error
	* @param Int: Http Status code
	* @param Object: Parametros de request
	* @param Object: Parametros del response
	* @author Felix Vasquez, Baum Digital
	*/
	constructor(msg, status = 500, payload = {}, response = {})
	{
		super(msg);
		this.name = "HttpException";
		this.message = msg;
		this.status = status;
		this.payload = payload;
		this.response = response;
	}
}


export 
class NetworkException extends HttpException
{
	constructor(msg, payload, response)
	{
		super(msg, -1, payload, response);
		this.name = "HttpNetworkException";
	}
}

