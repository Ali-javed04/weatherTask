import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import apiKeys from "../../services/apiKeys";
import LineChart from "../lineChart/lineChart"
import fetchWeatherData from '../../services/weatherapi';
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);


function Home(props) {
  const [query, setQuery] = useState("Dubai");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [unitConveration, setunitConveration] = useState("metric");
  const [checkcent, setCheckcent] = useState("metric");
  const [forecastData, setForecastData] = useState({});


  const search = (city) => {
    dayforcast(query)
    setCheckcent(unitConveration)
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=${unitConveration}&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setError({ message: "Not Found", query: query });
      });
  };
  const dayforcast = (city) => {
    
    fetchWeatherData(city)
      .then((data) => {
        if (data) {
            const refactortemp = []
            const refactorlabels = []
          const temperatureData = data.list.map((item) => item.main.temp);
          for (var i = 0; i < temperatureData.length; i+=8) {
            refactortemp.push(temperatureData[i])
          }
          const dateLabels = data.list.map((item) => item.dt_txt);
          for (var i = 0; i < dateLabels.length; i+=8) {
            refactorlabels.push(dateLabels[i])
          }
          const formattedDateLabels = refactorlabels.map((dateTime) => {
            const date = new Date(dateTime);
            return date.toLocaleDateString(); 
          });
          setForecastData({dateLabels: formattedDateLabels, temperatureData:refactortemp });
  }
})

}
  const handleUnitConveration = (event) => {
    setunitConveration(event.target.value);
  };

 

  useEffect(() => {
    search("Dubai");
    dayforcast("Dubai");


  }, []);

  return (
      <>
      <div className="container">
          <div className="row mt-4">
              <div className="col-md-4">
                  <label className="form-label">Enter City Name</label>
              <input
            type="text"
            className="search-bar form-control"
            placeholder="Search any city"   
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

              </div>
              <div className="col-md-4">
              <label className="form-label">Change Unit Conversation</label>
              <select className="form-select" value={unitConveration} onChange={handleUnitConveration}>
              <option className="form-control" value="metric">Calsius</option>
              <option className="form-control" value="imperial">Fahrenheit</option>
          </select>
                  
            </div>
             <div className="col-md-4">
             <label className="form-label">Check Result</label>
             <button className="btn btn-primary form-control"  onClick={search}>Search</button>
           
                  
            </div>
          </div>
      </div>
 
    <div className="container mt-4">
     
        
          {typeof weather.main != "undefined" ? (

             
            <div className="row">
                <h4 className="mt-4 mb-4 ">Current Weather Report</h4>
              {" "}
              
                  <div className="col-md-4">
                  <p>
                  {weather.name}, {weather.sys.country}
                </p>

                  </div>
                  <div className="col-md-4">
                  <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                     />
                  </div>
               
                  <div className="col-md-4">
                  <p>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)} <span> {checkcent == 'metric' ? '°C':'°F'}</span>  ({weather.weather[0].main})
                </span>
              </p>
              </div>
                
                <div className="col-md-4">
                <p>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </p>
              </div>
                
                <div className="col-md-4">
                <p>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </p>
              </div>
              <div className="col-md-4">
              
              <p>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </p>
              </div>
            </div>
          
          ) : (
            <p>
              {error.query} {error.message}
            </p>
          )}
      


<div>
    
</div>
{  typeof weather.main != "undefined" ?


<div className="row col-md-10 mt-5">
    <h3>5 Days Forecast Temperature Graph</h3>
    <LineChart labels={forecastData.dateLabels} data={forecastData.temperatureData} />
</div>

       : ''
}

    </div>
    </>
  );
}
export default Home;