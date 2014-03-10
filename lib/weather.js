function Weather(values,type) {
	this.type = type;
	try
	{
		this.values = JSON.parse(values);
	}
	catch(ex)
	{
		this.values = null;
		this.err = ex;
	}	
}

/*	
*	Summary	: 	Get the temperature in kelvin
*	Result 	: 	Temperature in Kelvin
*/
Weather.prototype.getKelvinTemp = function(pos){
	var result = {};
	if(typeof(pos)!='undefined')
	{
		if(this.type)
		{
			result.temp = this.values.list[pos].temp.day;
			result.temp_min = this.values.list[pos].temp.min;
			result.temp_max = this.values.list[pos].temp.max;
		}
		else
		{
			result.temp = this.values.list[pos].main.temp;
			result.temp_min = this.values.list[pos].main.temp_min;
			result.temp_max = this.values.list[pos].temp_max;
		}
	}
	else
	{
		result.temp = this.values.main.temp;
		result.temp_min = this.values.main.temp_min;
		result.temp_max = this.values.main.temp_max;
	}
	return result;
}

/*	
*	Summary	: 	Get the temperature in degree
*	Result 	: 	Temperature in degree
*/
Weather.prototype.getDegreeTemp = function(pos){
	var result = {};
	if(typeof(pos)!='undefined')
	{
		if(this.type)
		{
			result.temp = ToDegree(this.values.list[pos].temp.day);
			result.temp_min = ToDegree(this.values.list[pos].temp.min);
			result.temp_max = ToDegree(this.values.list[pos].temp.max);
		}
		else
		{
			result.temp = ToDegree(this.values.list[pos].main.temp);
			result.temp_min = ToDegree(this.values.list[pos].main.temp_min);
			result.temp_max = ToDegree(this.values.list[pos].main.temp_max);
		}
	}
	else
	{
		result.temp = ToDegree(this.values.main.temp);
		result.temp_min = ToDegree(this.values.main.temp_min);
		result.temp_max = ToDegree(this.values.main.temp_max);
	}
	return result;
}

/*	
*	Summary	: 	Get the temperature in fahrenheit
*	Result 	: 	Temperature in fahrenheit
*/
Weather.prototype.getFahrenheitTemp = function(pos) {
	var result = {};
	if(typeof(pos)!='undefined')
	{
		if(this.type)
		{
			result.temp = ToFahrenheit(this.values.list[pos].temp.day);
			result.temp_min = ToFahrenheit(this.values.list[pos].temp.min);
			result.temp_max = ToFahrenheit(this.values.list[pos].temp.max);
		}
		else
		{
			result.temp = ToFahrenheit(this.values.list[pos].main.temp);
			result.temp_min = ToFahrenheit(this.values.list[pos].main.temp_min);
			result.temp_max = ToFahrenheit(this.values.list[pos].main.temp_max);
		}
	}
	else
	{
		result.temp = ToFahrenheit(this.values.main.temp);
		result.temp_min = ToFahrenheit(this.values.main.temp_min);
		result.temp_max = ToFahrenheit(this.values.main.temp_max);
	}
	return result;
}

/*	
*	Summary	: 	Get the url of the icon corresponding to the weather
*	Result 	: 	Url of the icon
*/
Weather.prototype.getIconUrl = function(pos) {
	if(typeof(pos)=='undefined')
	{
		return "http://openweathermap.org/img/w/" + this.values.weather[0].icon;
	}
	else
	{
		return "http://openForecastmap.org/img/w/" + this.values.list[pos].weather[0].icon;
	}
}

Weather.prototype.toCityArray = function() {
	var result = [];
	this.values.list.forEach(function(data)
	{
		result.push([data.name,data.sys.country]);
	})
	return result;
}

/*	
*	Summary	: 	Convert kelvin to degree
*	Param	: 	Input temperature in Kelvin
*	Result 	: 	Temperature in degree
*/
function ToDegree(temp)
{
	return (temp - 273.15)
}

/*	
*	Summary	: 	Convert kelvin to fahrenheit
*	Param	: 	Input temperature in Kelvin
*	Result 	: 	Temperature in fahrenheit
*/
function ToFahrenheit(temp)
{
	return (9/5 * (temp - 273.15) + 32)
}


module.exports = Weather;