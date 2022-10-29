'use strict';

console.log('first server');

const { response } = require('express');
// **requires**

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
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

app.get('/weather', (request, response, next) => {
	
	let cityName = request.query.cityName;
	let lat = request.query.lat;
	let lon = request.query.lon; 
	try {
		let cityData = data.find(city => city.city_name === cityName)
		let groomedData = cityData.data.map(day => new Forecast(day)); // map returns an array of the date and description
	    response.status(200).send(groomedData);
	} catch(error) {
	next(error);
	}

});

class Forecast{
	constructor(dayObj){

	this.date= dayObj.datetime;
	this.description= dayObj.weather.description;
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