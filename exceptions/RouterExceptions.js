export 
class ViewExceptions extends Error
{
	constructor(msg)
	{
		super(msg);
		this.name = "ViewExceptions";
		this.message = "Error: " + msg;
	}
}