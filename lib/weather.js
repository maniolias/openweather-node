function OpenWeather(data,type) {
	if(data.cod==404)
		return null;
	else
	{
		data = JSON.parse(data)
		this.cod = data.cod;
		var list = [];
		if(type)
		{
			this.city = {};			
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
					clouds : data.clouds.all,
					wind :
					{
						speed : data.wind.speed,
						deg : data.wind.deg
					},
				};
				if(data.rain)
					w.rain = data.rain;
				if(data.snow)
					w.snow = data.snow;
				var weather = [];
				data.weather.forEach(function(aData)
				{
					weather.push(
					{
						id : aData.id,
						main : aData.main,
						description : aData.description,
						icon : "http://openForecastmap.org/img/w/" + aData.icon + ".png"
					})
				})
				w.weather = weather;
				list.push(w);
				this.list = list;
			}
		}
		else
		{
			data.list.forEach(function(aFind)
			{
				var w =
				{
					time : new Date(aFind.dt),
					temp : 
					{
						day : aFind.main.temp,
						min : aFind.main.temp_min,
						max : aFind.main.temp_max
					},
					pressure : aFind.main.pressure,
					humidity : aFind.main.humidity,
					clouds : aFind.clouds.all,
					wind :
					{
						speed : aFind.wind.speed,
						deg : aFind.wind.deg
					}
				}				
				if(aFind.rain)
					w.rain = aFind.rain;
				if(aFind.snow)
					w.snow = aFind.snow;
				var weather = [];
				aFind.weather.forEach(function(data)
				{
					weather.push(
					{
						id : data.id,
						main : data.main,
						description : data.description,
						icon : "http://openForecastmap.org/img/w/" + data.icon + ".png"
					})
				})
				w.weather = weather;
				list.push(w);
			});
			this.list = list;
		}
	}
}

module.exports = OpenWeather;