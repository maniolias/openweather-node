function Weather(values) {
  this.values = JSON.parse(values);
}

Weather.prototype.getKelvinTemp = function(){
	var result = {};
	result.temp = this.values.main.temp;
	result.temp_min = this.values.main.temp_min;
	result.temp_max = this.values.main.temp_max;
	return result;
}

Weather.prototype.getDegreeTemp = function(){
	var result = {};
	result.temp = ToDegree(this.values.main.temp);
	result.temp_min = ToDegree(this.values.main.temp_min);
	result.temp_max = ToDegree(this.values.main.temp_max);
	return result;
}

Weather.prototype.getFahrenheitTemp = function() {
	var result = {};
	result.temp = ToFahrenheit(this.values.main.temp);
	result.temp_min = ToFahrenheit(this.values.main.temp_min);
	result.temp_max = ToFahrenheit(this.values.main.temp_max);
	return result;
}

function ToDegree(temp)
{
	return temp - 273.15
}

function ToFahrenheit(temp)
{
	return 9/5 * (temp - 273.15) + 32
}


module.exports = Weather;