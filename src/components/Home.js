import React from "react";
import axios from "axios";
import Form from "../components/Form";
import Titles from "../components/Titles";
import Weather from "../components/Weather";
import { Link } from "react-router-dom";
require("dotenv").config();
class Home extends React.Component {
  state = {
    city: undefined,
    temperature: undefined,
    description: undefined,
    windspeed: undefined,
    condition: undefined,
    error: undefined
  };
  getWeather = e => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    const countryName = e.target.elements.country.value;

    if (cityName && countryName) {
      axios
        .post("http://localhost:5000/api/weather", {
          cityName: cityName,
          countryName: countryName
        })
        .then(res => {
          this.setState({
            city: cityName,
            temperature: res.data.main.temp,
            description: res.data.weather[0].description,
            condition: res.data.weather[0].main,
            windspeed: res.data.wind.speed,
            error: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
      // ///
      // axios
      //   .get(
      //     ` http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=4025915408022fc493a466ce10280449`
      //   )
      //   .then(res => {
      //     this.setState({
      //       city: cityName,
      //       temperature: res.data.main.temp,
      //       description: res.data.weather[0].description,
      //       condition: res.data.weather[0].main,
      //       windspeed: res.data.wind.speed,
      //       error: ""
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    } else {
      this.setState({
        temperature: undefined,
        description: undefined,
        windspeed: undefined,
        error: "Please enter a City"
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    description={this.state.description}
                    windspeed={this.state.windspeed}
                    error={this.state.error}
                  />
                  <Link
                    className={"city-view--home-link"}
                    to={{
                      pathname: "/playlist",
                      state: {
                        weather: {
                          cityName: this.state.city,
                          windspeed: this.state.windspeed,
                          condition: this.state.condition,
                          temp: this.state.temperature,
                          description: this.state.description,
                          isDataSet: true
                        }
                      }
                    }}
                  >
                    {"Create Playlist"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
