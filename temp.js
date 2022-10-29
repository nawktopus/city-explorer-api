'use strict';

//express - allows server // const 
express = require('express'); 
require ('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

//app === server -> express needs this;
const app = express();

//cors = middle man - bouncer; gets request can send out response 

app.use(cors());

//define port 
const PORT = process.env.PORT || 3002;
//3002 is backup incase there is any issues with 3000

// Build weather route and send groomed json data - arr of 3 days of weather {data, description} - to front end 
// need to be in this order (req,res)
// ? = quer
							
//front-end axios.get(http://localhost:3001/weather?cityName=value&lat=anothervalue&lon=anothervalue) -> fill in the missing information 
app.get('/weather', () => {(request,response)=>{
	let cityName = request.query.cityName;
	let lat = request.query.lat;
	let lon = request.query.lon;
	try {
		let cityData = data.find(city => city.city_name === cityName)
		let groomedData = cityData.data.map(day => new Forecast(day)); // map returns an array of the date and description
	response.status(200).send(groomedData);
	} catch(error) {
	next(error)
	}
}

class Forecast{

	constructor(dayObj){
	
	this.date= dayObj.datetime;
	this.description= dayObj.weather.description
	
	}
}

// .find() = very first element 
//errors 

app. use((err, requst, response, next) => {
	response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`)); 

});
