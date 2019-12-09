import React from "react";

const Form = props => (
  <div>
    <form onSubmit={props.getWeather}>
      <input type="text" name="city" placeholder="Enter a city.." />
      <input type="text" name="country" placeholder="Enter a country.." />
      <button>Show Weather</button>
    </form>
  </div>
);
export default Form;
