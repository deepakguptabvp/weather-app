import React, { useState } from 'react'
import { FaSearch, FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import './Weather.css';


const Weather = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('')
  const [error, setError] = useState('')

  // const description = weather.weather[0].description;
  // console.log(description);
  // const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  // const apiKey = process.env.REACT_APP_WEATHER_API;
  const API_KEY = '776ee648de6a5eb986f140c70c3eb660'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

  const handleOnChange = (event) => {
    setCity(event.target.value);
    console.log(event.target.value);
  }


  const fetchData = async () => {
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      if (data.ok) {
        setWeather(parsedData);
        console.log(parsedData);
        setError('');
      } else {
        setError('No data found. Please Enter a valid or full City name')
        setWeather('');
      }
    } catch (error) {
    }
  }


  return (
    <div className='container'>

      <div className='heading-w'><u> Weather-App </u></div>

      <div className='city'>
        <input type="text" value={city} onChange={handleOnChange} placeholder='Enter your city name here.' />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {/* check for wrong city name and show error message */}
      {
        error && <p className='error-message'>{error}</p>

      }

      {/*code for all weather details in the UI part  */}
      {
        weather && weather.weather &&

        <div className="content">

          <div className="weather-image">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-img" />
            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h3 className='temp'>{weather.main.temp} <span>&deg;C</span> </h3>
          </div>

          <div className="weather-city">
            <div className="location">
              <FaLocationDot />
            </div>
            <p style={{ marginTop: "10px" }}>{weather.name},<span>{weather.sys.country}</span></p>
          </div>

          {/* Rendering Weather Humidity & Wind Speed to UI part */}
          <div className="weather-stats">

            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
              <h3 className='humidity-heading'>Humidity</h3>
            </div>

            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className='wind-speed'>{weather.wind.speed}<span>km/h</span></h3>
              <h3 className='wind-heading'>Wind Speed</h3>
            </div>

          </div>
        </div>
      }

    </div>
  )
}

export default Weather