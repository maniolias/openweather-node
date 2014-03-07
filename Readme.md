# Openweather-Node

Openweather-Node is for get weather from openweather api.

## Installation

```
npm install -g openweather-node --save
```

### Example

```javascript
var weather = require("Openweather-Node")

weather.now("Lyon",function(aData)
{	
	console.log(aData.getKelvinTemp())
	console.log(aData.getDegreeTemp())
	console.log(aData.getFahrenheitTemp())
})

/*
* { temp: 281.15, temp_min: 281.15, temp_max: 281.15 }
* { temp: 8, temp_min: 8, temp_max: 8 }
* { temp: 46.4, temp_min: 46.4, temp_max: 46.4 }
*/
```

## How to use

### Instantiate the module

```javascript
var weather = require("Openweather-Node")

//set your API key if you have one
weather.setAPPID("Your API Key");
weather.setCulture("fr");
weather.setForecastType("daily"); //or "" for 3 hours forecast
```

### Use the differents function

```javascript
weather.now("Location",function(aData) //Can be id, city name or coordinate ([lat,lon])
{	
	//you can use weather 'object' aData
	
	/*Get the temperature in JSON object
	* {temp :  , temp_min : , temp_max :}
	*/
	
	weather.getKelvinTemp(); //In kelvin
	weather.getDegreeTemp(); //In Degree
	weather.getFahrenheitTemp(); //In Fahrenheit
	
	/*Get the icon url of the current weather*/
	weather.getIconUrl();
})