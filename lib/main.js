(function() {
	
	var http = require('http'),
	util = require('util'),
	weather = require('./weather.js')

	var options = {
		hostname: 'api.openweathermap.org',
		port: 80,
		method: 'GET'
	},
	lang = "en",
	units = "",
	forecastType = "",
	APPID = "",
	units = "metric"

	exports.setCulture = function(culture)
	{
		lang = culture
	}

	exports.setUnits = function(unit)
	{
		if(unit == "internal")
			units = "";
		else if(unit == "metric" || unit == "imperial")
			units = unit
		else
			throw new Error("'" + unit + "'" + " is not a proper unit.")
	}

	exports.setForecastType = function(type)
	{
		if(type == "hours" || type == "")
			forecastType = "";
		else if(type == "daily")
			forecastType = type
		else
			throw new Error("'" + type + "'" + " is not a proper forecast type.")
	}

	exports.setAPPID = function(APIKey)
	{
		APPID = APIKey
	}
	
	exports.now = function(location, callback)
	{
		requestWeather(location,"weather",callback)
	};

	exports.forecast = function(location, callback)
	{
		requestWeather(location,"forecast",callback)
	};

	exports.daily = function(location, callback)
	{
		requestWeather(location,"daily",callback)
	};

	exports.find = function(location, callback)
	{
		requestWeather(location,"find",callback)
	};

	requestWeather = function(location,type,callback)
	{
		switch(Object.prototype.toString.call(location))
		{
			case '[object Array]' :
				var weathers = [];
				var count = 0;
				location.forEach(
					function(data)
					{
						options.path = constructUrl(data, type)			
						getWeather(function(json)
						{					 
							var w = new weather(json,forecastType);
							weathers.push(w);
							count++;
							if(w.err) return callback(w.err,null);
							if(count == location.length)
								return callback(false,weathers);	
						});
					});
			break;
			default :
				options.path = constructUrl(location,type)			
				return oneWeather(callback,type);
			break;
		}
	};

	getWeather = function(callback)
	{
		return http.get(options, function(res)
		{
			var buffer = new Buffer(0)
			res.on('readable', function()
			{
				return buffer += this.read().toString('utf8');
			});
			return res.on('end', function()
			{
				return callback(buffer);
			});
		})
	}

	oneWeather = function(callback,type)
	{
		return getWeather(function(json)
		{
			var w = new weather(json,type);
			if(w.err) return callback(w.err,null);
			return callback(false,w);
		});
	}

	constructUrl = function(data,type,nb)
	{
		var i, n, result;
		result = [];
		result.push("/data/2.5/"+ ( type == "forecast" ? "forecast": "forecast/" + type ) + "?lang=" + lang + (units != "" ? ("&units=" + units):"") + (type == "forecast" ? "&cnt=" + (nb?nb:7):"") + (APPID?"&APPID=" + APPID : ""))
		for(i in data)
		{
			result.push("" + i + "=" + data[i]);
		}
		return result.join('&');
	} 

}).call(this);