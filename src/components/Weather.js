import React from "react";

const Weather = props => (
  <div className="weather__info">
    {props.temperature && (
      <p className="weather__key">
        Temperature:
        <span className="weather__value"> {props.temperature}</span>
      </p>
    )}
    {props.windspeed && (
      <p className="weather__key">
        Wind Speed:
        <span className="weather__value"> {props.windspeed}</span>
        m/s
      </p>
    )}
    {props.description && (
      <p className="weather__key">
        Conditions:
        <span className="weather__value"> {props.description}</span>
      </p>
    )}
    {props.error && <p className="weather__error">{props.error}</p>}
  </div>
);
export default Weather;
