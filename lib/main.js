(function() {
	
	var http = require('http'),
	util = require('util'),
	weather = require('./weather.js')

<<<<<<< HEAD
  var options = {
   	hostname: 'api.openweathermap.org',
  	port: 80,
  	method: 'GET'
  };
  
  exports.now = function(location, callback)
  {
	/* TODO
	*  Make a difference between one [lat,lon] and one [id,id]
	*/

  	switch(typeof(location))
  	{
  		case 'object' :
  			if (typeof(location[0]) == 'number')
  			{
  				options.path =	"/data/2.5/weather?lat="
  								+ location[0]
  								+ "&lon="
  								+ location[1];
  								return getWeather(function(json)
							    {
							    	var w = new weather(json);
							      	return callback(w);
							    });
  			}
  			else
  			{
  				var weathers = [];
  				switch(typeof(location[0]))
  				{
  					case 'string' :
  						var count = 0;
  						location.forEach(
  							function(city)
  							{
  								options.path =	"/data/2.5/weather?q=" + city;
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
  					/*case 'number' :
  						var count = 0;
  						location.forEach(
  							function(id)
  							{
  								options.path =	"/data/2.5/weather?id=" + id;
  								getWeather(function(json)
							    {							    	
							    	var w = new weather(json);
							      	weathers.push(w);
							      	count++;
							      	if(count == location.length)
							      		return callback(weathers);  
							    });						    	
							});
  					break;*/
  					case 'object' :
  						var count = 0;
  						location.forEach(
  							function(coor)
  							{
  								options.path =	"/data/2.5/weather?lat=" + coor[0] + "&lon=" + coor [1];
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
  				}
  			}
  		break;
  		case 'string' :
  			options.path =	"/data/2.5/weather?q=" + location;
  			return getWeather(function(json)
		    {
		    	var w = new weather(json);
		      	return callback(w);
		    });
  		break;
  		case 'number' :
  			options.path =	"/data/2.5/weather?id=" + location;
  			return getWeather(function(json)
		    {
		    	var w = new weather(json);
		      	return callback(w);
		    });
  		break;
  	}
  };
=======
	var options = {
		hostname: 'api.openweathermap.org',
		port: 80,
		method: 'GET'
	},
	lang = "en",
	units = "",
	forecastType = "",
	APPID = "";
>>>>>>> origin/0.0.2

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
							if(count == location.length)
								return callback(weathers);	
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
			return callback(w);
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