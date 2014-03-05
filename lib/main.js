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
  	switch(typeof(location))
  	{
  		case 'object' :
  				var weathers = [];
					var count = 0;
					location.forEach(
						function(data)
						{
              switch(typeof(data))
              {
                case 'string' :
  							  options.path =	"/data/2.5/weather?q=" + data+ "&lang=" + lang;
                break;
                case 'number' :
                  options.path =  "/data/2.5/weather?id=" + data+ "&lang=" + lang;
                break;
                case 'object' :
                  options.path =  "/data/2.5/weather?lat=" + data[0] + "&lon=" + data [1]+ "&lang=" + lang;
                break;
            }					  
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