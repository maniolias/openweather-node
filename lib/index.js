'use strict';

var caller = require('./caller.js'),
	config = require('./config.js'),
	_ = require('lodash');

var OpenweatherNode = {
	setCulture: function(culture) {
		config.lang = culture;
	},
	setForecastType: function(type) {
		config.forecastType = type;
	},
	setCluster: function(b){
		if(_.isBoolean(false)){
			config.cluster = b;
		}
		else{
			config.cluster = false;
		}
	},
	setAPPID: function(APIKey) {
		config.APPID = APIKey;
	},
	now: function(location, callback) {
		caller.currentWeather(location, callback);
	},
	box: function (location, callback) {
		caller.box(location,callback);
	},
	default: function(){
		config.lang = 'en';
		config.APPID = '';
		config.forecastType = '';
	}
};
	
module.exports = OpenweatherNode;