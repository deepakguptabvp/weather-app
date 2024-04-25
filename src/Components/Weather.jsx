import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './Weather.css';


const Weather = () => {

  const [city, setCity] = useState('');
  // eslint-disable-next-line
  const [weather, setWeather] = useState('')
  const [error, setError] = useState('')

  // const description = weather.weather[0].description;
  // console.log(description);
  // const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  const API_KEY = "776ee648de6a5eb986f140c70c3eb660"
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
        setError('No data found. Please Enter a valid City name.')
      }
    } catch (error) {

    }
  }


  return (
    <div className='container'>
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

      {/*to show the weather details in the UI part  */}
      {
        weather && weather.weather &&
        <div className="content">
          
          <div className="weather-image">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather image" />
           
            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

          <div className="temp">
            <h3 className='temp'>{weather.main.temp} <span>&deg;C</span> </h3>
          </div>

        </div>
      }

    </div>
  )
}

export default Weather