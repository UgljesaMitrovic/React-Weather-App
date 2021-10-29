import Weather from "./Weather";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Location from "./Location";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [weathers, setWeather] = useState();
  const [locationKey, setLocationKey] = useState("");
  const [location, setLocation] = useState("");

  const numTrans = (num) => {
    const stringNum = num + "";
    const stringLength = stringNum.length;

    if (stringLength === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  useEffect(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
      )
        .then((res) => res.json())
        .then((res) =>
          setWeather(
            res.DailyForecasts.map((df) => {
              return {
                min: df.Temperature.Minimum.Value,
                max: df.Temperature.Maximum.Value,
                weatherType: df.Day.IconPhrase,
                weatherKey: numTrans(df.Day.Icon),
                dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],
              };
            })
          )
        );
    }
  }, [locationKey, apiKey]);

  return (
    <div>
      <Location
        onCityFound={(cityInfo) => {
          setLocationKey(cityInfo.key);
          setLocation(cityInfo.name + ", " + cityInfo.state);
        }}
      />

      <h1>{location}</h1>

      <div className={styles.main}>
        {!!weathers &&
          weathers.map((i, index) => (
            <div className={styles.day} key={index}>
              <Weather
                min={i.min}
                max={i.max}
                weatherType={i.weatherType}
                weatherKey={i.weatherKey}
                dayOfWeek={i.dayOfWeek}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
