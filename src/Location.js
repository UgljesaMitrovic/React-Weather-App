import { React, useState } from "react";

export default function Location({ onCityFound }) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [location, setLocation] = useState("");

  const getLocation = () => {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${location}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.find((loc) => loc.Country.ID === "RS"))
      .then((res) => {
        onCityFound({
          name: res.LocalizedName,
          key: res.Key,
          state: res.AdministrativeArea.CountryID,
        });
        setLocation("");
      });
  };

  return (
    <div>
      <input
        placeholder="City Name"
        value={location}
        onChange={(text) => {
          setLocation(text.target.value);
        }}
      />
      <button onClick={getLocation}>Search</button>
    </div>
  );
}
