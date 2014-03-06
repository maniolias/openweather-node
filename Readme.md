# Openweather-Node

Openweather-Node is for get weather from openweather api.

## Installation

```
npm install -g Openweather-Node --save
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
