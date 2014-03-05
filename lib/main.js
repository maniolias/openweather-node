(function() {
  var http = require('http'),
  util = require('util'),
  weather = require('./weather.js')

  var options = {
   	hostname: 'api.openweathermap.org',
  	port: 80,
  	method: 'GET'
  },
  lang = "en";

  exports.setCulture = function(culture)
  {
    lang = culture
  }
  
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
  								+ location[1]
                  + "&lang="
                  + lang;
  								return oneWeather(callback);
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
  								options.path =	"/data/2.5/weather?q=" + city+ "&lang=" + lang;
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
  					case 'number' :
  						var count = 0;
  						location.forEach(
  							function(id)
  							{
  								options.path =	"/data/2.5/weather?id=" + id+ "&lang=" + lang;
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
  					case 'object' :
  						var count = 0;
  						location.forEach(
  							function(coor)
  							{
  								options.path =	"/data/2.5/weather?lat=" + coor[0] + "&lon=" + coor [1]+ "&lang=" + lang;
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
  			options.path =	"/data/2.5/weather?q=" + location+ "&lang=" + lang;
  			return oneWeather(callback);
  		break;
  		case 'number' :
  			options.path =	"/data/2.5/weather?id=" + location+ "&lang=" + lang;
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
          var w = new weather(json);
            return callback(w);
    });
  }

}).call(this);