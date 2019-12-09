import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import WeatherResult from "./components/WeatherResult";
require("dotenv").config();
const WEATHER_API_KEY = process.env.APIKEY;
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/playlist" component={WeatherResult} exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
