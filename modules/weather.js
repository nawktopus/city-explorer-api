'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
    try{
        let lat = request.query.lat;
        let lon = request.query.lon; 
    
            // let cityData = data.find(city => city.city_name === cityName)
            let url = `http://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&day=7&units=F`
    
            let getWeather = await axios.get(url);
    
            console.log('lat', lat);
            console.log('lon', lon);
            console.log('weather results', getWeather.data);
    
        let groomedData = getWeather.data.data.map(day => {return new Forecast(day)}); // map returns an array of the date and description
            response.status(200).send(groomedData);
        } catch(error) {
        next(error);
        }
        
}

class Forecast{
	constructor(weatherData){

	this.datetime= weatherData.datetime;
	this.description= weatherData.weather.description;
	}
}

module.exports=getWeather;