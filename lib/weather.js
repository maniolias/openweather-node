'use strict';

var internals = {};

internals.toDegree = function(temp) {
	return (temp - 273.15);
};

internals.toFahrenheit = function(temp) {
	return (9 / 5 * (temp - 273.15) + 32);
};

function Weather(values, type) {
	this.type = type;
	try {
		this.values = JSON.parse(values);
	} catch (ex) {
		this.values = null;
		this.err = ex;
	}
}

Weather.prototype.getKelvinTemp = function(pos) {
	var result = {};
	if (typeof(pos) !== 'undefined') {
		if (this.type) {
			result.temp = this.values.list[pos].temp.day;
			result.tempMin = this.values.list[pos].temp.min;
			result.tempMax = this.values.list[pos].temp.max;
		} else {
			result.temp = this.values.list[pos].main.temp;
			result.tempMin = this.values.list[pos].main.tempMin;
			result.tempMax = this.values.list[pos].tempMax;
		}
	} else {
		result.temp = this.values.main.temp;
		result.tempMin = this.values.main.tempMin;
		result.tempMax = this.values.main.tempMax;
	}
	return result;
};

Weather.prototype.getDegreeTemp = function(pos) {
	var result = {};
	if (typeof(pos) !== 'undefined') {
		if (this.type) {
			result.temp = internals.toDegree(this.values.list[pos].temp.day);
			result.tempMin = internals.toDegree(this.values.list[pos].temp.min);
			result.tempMax = internals.toDegree(this.values.list[pos].temp.max);
		} else {
			result.temp = internals.toDegree(this.values.list[pos].main.temp);
			result.tempMin = internals.toDegree(this.values.list[pos].main.tempMin);
			result.tempMax = internals.toDegree(this.values.list[pos].main.tempMax);
		}
	} else {
		result.temp = internals.toDegree(this.values.main.temp);
		result.tempMin = internals.toDegree(this.values.main.tempMin);
		result.tempMax = internals.toDegree(this.values.main.tempMax);
	}
	return result;
};

Weather.prototype.getFahrenheitTemp = function(pos) {
	var result = {};
	if (typeof(pos) !== 'undefined') {
		if (this.type) {
			result.temp = internals.toFahrenheit(this.values.list[pos].temp.day);
			result.tempMin = internals.toFahrenheit(this.values.list[pos].temp.min);
			result.tempMax = internals.toFahrenheit(this.values.list[pos].temp.max);
		} else {
			result.temp = internals.toFahrenheit(this.values.list[pos].main.temp);
			result.tempMin = internals.toFahrenheit(this.values.list[pos].main.tempMin);
			result.tempMax = internals.toFahrenheit(this.values.list[pos].main.tempMax);
		}
	} else {
		result.temp = internals.toFahrenheit(this.values.main.temp);
		result.tempMin = internals.toFahrenheit(this.values.main.tempMin);
		result.tempMax = internals.toFahrenheit(this.values.main.tempMax);
	}
	return result;
};

Weather.prototype.getIconUrl = function(pos) {
	if (typeof(pos) === 'undefined') {
		return 'http://openweathermap.org/img/w/' + this.values.weather[0].icon;
	} else {
		return 'http://openForecastmap.org/img/w/' + this.values.list[pos].weather[0].icon;
	}
};

Weather.prototype.toCityArray = function() {
	var result = [];
	this.values.list.forEach(function(data) {
		result.push([data.name, data.sys.country]);
	});
	return result;
};

module.exports = Weather;