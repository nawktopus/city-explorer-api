'use strict';

console.log('first server');

const { response } = require('express');
// **requires**

const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

//once express is in/ app ===server
// **endpoints**
const app = express();

app.use(cors());
//define port
const PORT = process.env.PORT || 3002;
//3002, something wrong with .env or didn't bring in dotenv library

app.get('/', (request, response)=> {
    console.log('This is showing up in my terminal!');
    response.status(200).send('Welcome to my server');
});

app.get('/weather', async (request, response, next) => {
	try {

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

});

class Forecast{
	constructor(weatherData){

	this.datetime= weatherData.datetime;
	this.description= weatherData.weather.description;
	}
}

app.get('/movies', async (request, response, next) => {

	try{

	let city = request.query.city_name;

	let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`

	let movieData = await axios.get(url);

	let getMovie = movieData.data.results.map(movie => {
		return new Movie(movie);
	});

	response.status(200).send(getMovie);

	} catch(error) {
		next(error);
	}

});

class Movie{
	constructor(movies) {
		this.title = movies.title;
		this.overview = movies.overview;
	}
}

//catchall should live at bottom of endpoint
app.get('*', (request,response)=>{
    response.status(404).send('This route does not exist');
});
// **Error handling**
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
});


// **server start** 
app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`));