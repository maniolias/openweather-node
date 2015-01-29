'use strict';

var config = require('./config.js'),
	weather = require('./weather.js'),
	builder = require('./queryBuilder.js'),
	_ = require('lodash'),
	http = require('http');

var Caller = {
	currentWeather: function(location, callback) {
		location = builder.buildLocation(location);
		if (location.err) {
			callback(location.err);
		}
		var url = builder.buildUrl(location.value);
		var opts = _.merge(_.clone(config.options), url);
		this.callOpenweatherMapApi(opts, function(err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null, new weather(data));
			}
		});
	},
	callOpenweatherMapApi: function(options, callback) {
		http.get(options, function(res) {
			var str = new Buffer(0);
			res.on('data', function(chunk) {
				str += chunk;
			});
			res.on('end', function() {
				return callback(null, str);
			});
		}).on('error', function(err) {
			return callback(err);
		});
	}
};

module.exports = Caller;