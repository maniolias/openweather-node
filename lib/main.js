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
	APPID = "";

	exports.setCulture = function(culture)
	{
		lang = culture
	}

	exports.setForecastType = function(type)
	{
		forecastType = type
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

	exports.find = function(location, callback)
	{
		requestWeather(location,"find",callback)
	};

	requestWeather = function(location,type,callback)
	{
		switch(typeof(location))
		{
			case 'object' :
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
				return oneWeather(callback);
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

	oneWeather = function(callback)
	{
		return getWeather(function(json)
		{
			var w = new weather(json,forecastType);
			if(w.err) return callback(w.err,null);
			return callback(false,w);
		});
	}

	constructUrl = function(data,type,nb)
	{
		switch(typeof(data))
		{
			case 'string' :
				return	"/data/2.5/" + type + (forecastType && type == "forecast" ? "/" + forecastType: "") + "?q=" + data+ "&lang=" + lang + (type == "forecast" ? "&cnt=" + (nb?nb:7):"") + (APPID?"&APPID=" + APPID : "") ;
			break;
			case 'number' :
				return	"/data/2.5/" + type + (forecastType && type == "forecast" ? "/" + forecastType : "") + "?id=" + data+ "&lang=" + lang + (type == "forecast" ? "&cnt=" + (nb?nb:7):"") + (APPID?"&APPID=" + APPID : "") ;
			break;
			case 'object' :
				return	"/data/2.5/" + type + (forecastType && type == "forecast" ? "/" + forecastType : "") + "?lat=" + data[0] + "&lon=" + data [1]+ "&lang=" + lang + (type == "forecast" ? "&cnt=" + (nb?nb:7):"") + (APPID?"&APPID=" + APPID : "") ;
			break;
		}
	} 

}).call(this);