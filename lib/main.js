(function() {
  var http = require('http'),
  util = require('util'),
  weather = require('./weather.js')

  var options = {
   	hostname: 'api.openweathermap.org',
  	port: 80,
  	method: 'GET'
  };
  
  exports.now = function(location, callback)
  {
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
  								count++;
  								options.path =	"/data/2.5/weather?q=" + location;
  								getWeather(function(json)
							    {							    	
							    	var w = new weather(json);
							      	weathers.push(w);
							    });
							    if(count == location.length)
							    {
									return callback(weathers);
							    }							    	
							});  						
  					break;
  					case 'number' :

  					break;
  					case 'object' :

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

}).call(this);