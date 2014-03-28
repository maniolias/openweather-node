function OpenWeather(data,type) {
	if(data.cod==404)
		return null;
	else
	{
		data = JSON.parse(data)
		this.cod = data.cod;
		this.city = {};
		var list = [];
		if(data.list)
		{
			this.city.id = data.city.id;
			this.city.name = data.city.name;
			this.city.coord = [];
			this.city.coord.lon = data.city.coord.lon;
			this.city.coord.lat = data.city.coord.lat;
			if(type != "")
			{
				data.list.forEach(function(aForecast)
				{
					var w =
					{
						time : new Date(aForecast.dt),
						temp : 
						{
							day : aForecast.temp.day,
							min : aForecast.temp.min,
							max : aForecast.temp.max,
							night : aForecast.temp.night,
							eve : aForecast.temp.eve,
							morn : aForecast.temp.morn
						},
						pressure : aForecast.pressure,
						humidity : aForecast.humidity,
						weather :
						{
							id : aForecast.weather.id,
							main : aForecast.weather.main,
							description : aForecast.weather.description,
							icon : "http://openForecastmap.org/img/w/" + aForecast.weather.icon + ".png"
						},
						clouds : aForecast.clouds,
						wind :
						{
							speed : aForecast.speed,
							deg : aForecast.deg
						},

					}				
					if(aForecast.rain)
						w.rain = aForecast.rain;
					if(aForecast.snow)
						w.snow = aForecast.snow;
					list.push(w);
				});
			}
			else
			{
				data.list.forEach(function(aForecast)
				{
					var w =
					{
						time : new Date(aForecast.dt_txt),
						temp : 
						{
							day : aForecast.main.temp,
							min : aForecast.main.temp_min,
							max : aForecast.main.temp_max
						},
						pressure : aForecast.main.pressure,
						humidity : aForecast.main.humidity,
						weather :
						{
							id : aForecast.weather.id,
							main : aForecast.weather.main,
							description : aForecast.weather.description,
							icon : "http://openForecastmap.org/img/w/" + aForecast.weather.icon + ".png"
						},
						clouds : aForecast.clouds.all,
						wind :
						{
							speed : aForecast.wind.speed,
							deg : aForecast.wind.deg
						},

					}				
					if(aForecast.rain)
						w.rain = aForecast.rain;
					if(aForecast.snow)
						w.snow = aForecast.snow;
					list.push(w);
				});
			}
			this.list = list;
		}
		else
		{
			this.city.id = data.id;
			this.city.name = data.name;
			this.city.coord = [];
			this.city.coord.lon = data.coord.lon;
			this.city.coord.lat = data.coord.lat;
			var w =
			{
				time : new Date(data.dt),
				temp : 
				{
					day : data.main.temp,
					min : data.main.temp_min,
					max : data.main.temp_max
				},
				pressure : data.main.pressure,
				humidity : data.main.humidity,
				weather :
				{
					id : data.weather[0].id,
					main : data.weather[0].main,
					description : data.weather[0].description,
					icon : "http://openForecastmap.org/img/w/" + data.weather[0].icon + ".png"
				},
				clouds : data.clouds.all,
				wind :
				{
					speed : data.wind.speed,
					deg : data.wind.deg
				},
			};
			console.log(w)
			if(data.rain)
				w.rain = data.rain;
			if(data.snow)
				w.snow = data.snow;
			list.push(w);
			this.list = list;
		}
	}
}

module.exports = OpenWeather;