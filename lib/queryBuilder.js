'use strict';

var _ = require('lodash'),
	config = require('./config'),
	path = require('path');

var Builder = {
	buildLocation : function(location){
		if(_.isArray(location)){
			return { value : 'lat=' + location[0] + '&lon=' + location[1], err : null};
		}
		else if(!_.isNaN(_.parseInt(location)))
		{
			return  { value : 'id=' + location, err : null};
		}
		else if(_.isString(location)){
			return  { value : 'q=' + location, err : null};
		}
		else{
			return { value : null + location, err : 'unsupproted type'};
		}
	},
	buildUrlWeather : function(location){
		return { path : path.join('/data','2.5','weather?' + location)};
	},
	buildUrlBox : function(location){
		return { path : path.join('/data','2.5','box' ,'city?bbox=' + location + '&cluster=' + config.getCluster())};
	}
};

module.exports = Builder;