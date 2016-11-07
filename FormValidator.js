import validator from 'validator';


export default 
class FormValidator
{
	/**
	 * [constructor description]
	 * @param  {Object} rules Rules schema:
	 *     {
	 *     	  <String: fieldname>: {
	 *     	  	options: <String or Array>,
	 *     	  	message: <String>
	 *     	  }
	 *     }
	 */
	constructor(rules){
		this.rules = rules;
	}


	/**
	 * Validates a field
	 * @param  {String, Object or Array} value
	 * @param  {String} 				 fieldname
	 */
	validate(value, fieldname)
	{
		if(Array.isArray(value)) return validateArray.call(this, value);
		if(typeof value == 'object') return validateObject.call(this, value);

		let options = findRule(fieldname, this.rules);
		if(!options) throw new TypeError(`Fieldname not found in your schema: "${fieldname}"`);

		return startValidation(value, fieldname, options);
	}
}


/**
 * Converts object to array to validate it
 * @this {FormValidator}
 * @param  {Object} obj {name: foo}
 */
function validateObject(obj)
{
	let values = [];
	for(let key in obj)
	{
		values.push({fieldname: key, value: obj[key]});
	}

	validateArray.call(this, values);
}




/**
 * Iterates an array and starts validation for each object
 * @this {FormValidator}
 * @param  {Array} values [{fieldname: <string>, value: <string>}, ...]
 */
function validateArray(values)
{
	var errors = [];
	
		values.forEach((obj, index)=>{
			try{
				this.validate(obj.value, obj.fieldname);
			}catch(err){
				if(err.name == 'FormValidationError') errors = errors.concat(err.errors);
				else throw err;
			}
		});

	if(errors.length > 0) throw {name: 'FormValidationError', errors};
	
}





/**
 * Looks for the correct rule options
 * @param  {String} fieldname Name that the rule has
 * @param  {String} rules     Object of rules and options
 * @return {Object}           Object with rule options
 */
function findRule(fieldname, rules)
{
	for(let key in rules)
	{
		if(key == fieldname) return rules[key];
	}

	return null;
}






/**
 * Validates a single value with all the rules given to it
 * @param  {String} value 		Evaluating string
 * @param  {String} fieldanme  Evaluating filedname
 * @param  {Object} rules 		Object with rule options
 * @throws {FormValidationError} If any validation fails
 */
function startValidation(value, fieldname, rules)
{
	let errors = [];
	value = value + ''; //validator library only accepts strings
	for(let rule in rules)
	{
		if(typeof validator[rule] == 'undefined') throw new TypeError(`The rule "${rule}"" is not valid, please check your rules schema`);
		let callingArgs = [value].concat(rules[rule].options);
		let valid = validator[rule].apply(this, callingArgs );
		let errorMsg = rules[rule].message || `"${value}" didnt pass the rule: ${rule}`;

		if(!valid) errors.push({fieldname, message: errorMsg});
	}

	if(errors.length > 0) throw {name: 'FormValidationError', errors};
}