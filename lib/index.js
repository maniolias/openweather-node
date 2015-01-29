var caller = require('./caller.js'),
	config = require('./config.js');

var OpenweatherNode = {
    setCulture: function(culture) {
        config.lang = culture;
    },
    setForecastType: function(type) {
        config.forecastType = type;
    },
    setAPPID: function(APIKey) {
        config.APPID = APIKey;
    },
    now: function(location, callback) {
        caller.currentWeather(location, callback);
    },
    default: function(){
    	config.lang = 'en';
    	config.APPID = '';
    	config.forecastType = '';
    }
};

module.exports = OpenweatherNode;