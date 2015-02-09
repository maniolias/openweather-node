'use strict';

var Config = {
	options: {
		host: 'api.openweathermap.org',
		port: 80,
		method: 'GET'
	},
	lang: 'en',
	units: '',
	forecastType: '',
	APPID: '',
	cluster:false,
	getCluster: function(){
		return this.cluster? 'yes':'no';
	}
};

module.exports = Config;