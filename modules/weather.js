'use strict';

let cache = require('./cache.js');
const axios = require('axios');

function getWeatherData(latitude, longitude) {
    let lat = latitude;
    let lon = longitude;
    const key = 'weather-' + lat + lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
  
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
    }
    
    return cache[key].data;
  }
  function parseWeather(weatherData) {
    try {
      const weatherSummaries = weatherData.data.map(day => {
        return new Weather(day);
      });
      return Promise.resolve(weatherSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
  class Weather {
    constructor(day) {
      this.description = day.weather.description;
      this.datetime = day.datetime;
      this.timestamp = Date.now();
    }
  }


module.exports=getWeatherData;
