import React from "react";
import WeatherResultMusic from "../components/WeatherResultMusic";
import { Link } from "react-router-dom";

class WeatherResult extends React.Component {
  renderMusic = () => {
    if (this.props.location.state.weather.isDataSet) {
      return <WeatherResultMusic weather={this.props.location.state.weather} />;
    }
  };

  render() {
    return (
      <div className={"city-view-page--wrapper"}>
        <div className={"city-view--city"}>
          <Link className={"city-view--home-link"} to="/">
            {"<"}
          </Link>
          <span className={"city-view--cityname"}>
            {this.props.location.state.weather.cityName}
          </span>
        </div>
        <div className={"city-view--weather-wrapper"}>
          <div className={"city-view--condition-left"}>
            <span className={"city-view--wind"}>
              {this.props.location.state.weather.windspeed} m/s
            </span>
            <span className={"city-view--desc"}>
              {this.props.location.state.weather.condition}
            </span>
          </div>
          <div className={"city-view--condition-right"}>
            <span className={"city-view--temperature"}>
              {this.props.location.state.weather.temp}°C
            </span>
          </div>
        </div>
        {this.renderMusic()}
      </div>
    );
  }
}

export default WeatherResult;
