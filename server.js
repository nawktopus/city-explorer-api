'use strict';

console.log('first server');
// **requires**

require('dotenv').config();
const { response } = require('express');
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');

//once express is in/ app ===server
// **endpoints**
const app = express();

app.use(cors());
//define port
const PORT = process.env.PORT || 3002;

app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

function weatherHandler (request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)

  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

function movieHandler(request, response) {
    const {city_name} = request.query;
    console.log(city_name);
    movies(city_name)
      .then(summaries => response.send(summaries))
      .catch((error) => {
        console.error(error);
        response.status(200).send('Sorry, something went wrong on movies!');
      });
    }

// **server start** 
app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`));