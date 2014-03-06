# Openweather-Node

Openweather-Node is for get weather from openweather api.

## Installation

```
<<<<<<< HEAD
npm install -g openweather-node --save
=======
npm install -g Openweather-Node --save
>>>>>>> 3b9f38e5ec7da797cab78d09711d72b8a7c3b742
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
<<<<<<< HEAD
```
=======
```
>>>>>>> 3b9f38e5ec7da797cab78d09711d72b8a7c3b742
