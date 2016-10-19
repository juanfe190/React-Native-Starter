export 
class HttpException extends Error
{
	constructor(msg, status = 500, payload = {})
	{
		super(msg);
		this.name = "HttpException";
		this.message = msg;
		this.status = status;
		this.payload = payload;
	}
}


export 
class NetworkException extends HttpException
{
	constructor(msg)
	{
		super(msg, -1);
		this.name = "HttpNetworkException";
	}
}