const express = require("express");
const axios = require("axios");
const features = require("../src/actions/WeatherToAudioFeature");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const spotifyClientID = process.env.SPOTIFY_ID;
const spotifyClientSecret = process.env.SPOTIFY_SECRET;

var spotifyAccessTokenSet = false;
var spotifyAccessToken = null;

const spotifyGenres = features.spotifyGenres;
const FeatureWeather = features.FeatureWeather;

const getSpotifyAccessToken = () => {
  return axios({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    params: {
      grant_type: "client_credentials"
    },
    headers: {
      Authorization: `Basic ${new Buffer(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(respond => {
      console.log("got new token");
      return respond.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const setSpotifyAccessToken = () => {
  let tokenPromise = null;
  if (!spotifyAccessTokenSet) {
    tokenPromise = getSpotifyAccessToken()
      .then(res => {
        spotifyAccessTokenSet = true;
        return res.access_token;
      })
      .catch(err => {
        spotifyAccessTokenSet = false;
        console.log(err);
      });
    spotifyAccessToken = tokenPromise.then(access_token => {
      return access_token;
    });
  }
  return spotifyAccessToken;
};

const tokenRefresher = () => {
  setSpotifyAccessToken();
  setTimeout(() => {
    spotifyAccessTokenSet = false;
    tokenRefresher();
  }, 3500000);
};
// Refresh token every 1 hour
tokenRefresher();

const getPlaylist = (weatherObj, token) => {
  let result = FeatureWeather(
    weatherObj.temp,
    weatherObj.condition,
    weatherObj.description,
    weatherObj.windspeed
  );
  const shuffled = spotifyGenres.sort(() => 0.5 - Math.random);
  let genres = shuffled.slice(0, 2).join(",");
  return axios({
    url: "https://api.spotify.com/v1/recommendations",
    method: "GET",
    // Merge features object with query options
    params: Object.assign(result, {
      seed_genres: genres,
      limit: 12,
      min_popularity: 15
    }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data.tracks;
    })
    .catch(err => {
      console.log(err);
    });
};
//route for getting weather
app.post("/api/weather", (req, res) => {
  axios
    .get(
      ` http://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName},${req.body.countryName}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    )
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
});

//route for getting a token and playlist
app.post("/api/songs", (req, res) => {
  setSpotifyAccessToken()
    .then(token => {
      return getPlaylist(req.body.weatherObj, token);
    })
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
