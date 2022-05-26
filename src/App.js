import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [city, setCity] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API key}&units=metric`      
        );
      setTemperature(res.data.main.temp);
      setCity(res.data.name);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div className="app">
      <div className="container">
        <h1>{city}</h1>
        <h1>{temperature}ºC</h1>
        <h1>{weather}</h1>
      </div>
    </div>
  );
}

export default App;
