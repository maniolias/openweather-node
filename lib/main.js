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
	units = "";

	exports.setCulture = function(culture)
	{
		lang = culture
	}
	
	exports.now = function(location, callback)
	{
		switch(typeof(location))
		{
			case 'object' :
				var weathers = [];
				var count = 0;
				location.forEach(
					function(data)
					{
						options.path = constructUrl(data)						
						getWeather(function(json)
						{					 
							var w = new weather(json);
							weathers.push(w);
							count++;
							if(count == location.length)
								return callback(weathers);	
						});
					});
			break;
			default :
				options.path = constructUrl(location)
				return oneWeather(callback);
			break;
		}
	};

	exports.forecast = function(location,forecastType, callback)
	{
		
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
			console.log(options.path)
			var w = new weather(json);
			return callback(w);
		});
	}

	constructUrl = function(data)
	{
		switch(typeof(data))
		{
			case 'string' :
				return	"/data/2.5/weather?q=" + data+ "&lang=" + lang;
			break;
			case 'number' :
				return	"/data/2.5/weather?id=" + data+ "&lang=" + lang;
			break;
			case 'object' :
				return	"/data/2.5/weather?lat=" + data[0] + "&lon=" + data [1]+ "&lang=" + lang;
			break;
		}
	} 

}).call(this);