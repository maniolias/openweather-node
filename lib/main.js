(function() {
  var http = require('http');

  var options = {
   	hostname: 'api.openweathermap.org',
  	port: 80,
    path: '/data/2.5/weather?q=Lyon',
  	method: 'GET'
  };
  
  exports.now = function(callback)
  {
    return getWeather(function(json)
    {
      return callback(json);
    });
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