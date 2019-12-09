const FeatureWeather = (temp, cond, Description, wind) => {
  wind = Number(wind);
  temp = Number(temp);

  // Object to be returned to make API call with features set
  let featureObject = {};

  switch (cond) {
    case "Clear":
      featureObject.min_valence = 0.6;
      featureObject.mode = 1;
      featureObject.min_energy = 0.6;
      break;
    case "Clouds":
      switch (Description) {
        case "few clouds":
          featureObject.min_valence = 0.6;
          featureObject.min_energy = 0.6;
          break;
        case "scattered clouds":
          featureObject.max_valence = 0.8;
          featureObject.max_energy = 0.6;
          break;
        case "broken clouds":
          featureObject.max_valence = 0.7;
          featureObject.max_energy = 0.6;
          break;
        case "overcast clouds":
          featureObject.max_valence = 0.5;
          featureObject.max_energy = 0.6;
          break;
      }
      break;
    case "Atmosphere":
      featureObject.max_valence = 0.5;
      featureObject.mode = 0;
      featureObject.max_energy = 0.5;
      break;
    case "Snow":
      featureObject.min_valence = 0.55;
      featureObject.mode = 1;
      featureObject.max_energy = 0.5;
      break;
    case "Rain":
      featureObject.max_valence = 0.55;
      featureObject.max_energy = 0.55;
      break;
    case "Drizzle":
      featureObject.max_valence = 0.55;
      featureObject.max_energy = 0.55;
      break;
    case "Thunderstorm":
      featureObject.max_valence = 0.5;
      featureObject.max_energy = 0.7;
      break;
    default:
      featureObject.max_valence = 0.7;
      featureObject.max_energy = 0.7;
      console.log("set DEFAULT CONDITION");
  }

  //  Add energy depending on wind speed
  switch (true) {
    case wind < 0.3:
      featureObject.max_energy += 0;
      break;
    case wind < 1.5:
      featureObject.max_energy += 0.025;
      break;
    case wind < 3.3:
      featureObject.max_energy += 0.05;
      break;
    case wind < 5.5:
      featureObject.max_energy += 0.075;
      break;
    case wind < 10.7:
      featureObject.max_energy += 0.1;
      break;
    case wind < 15:
      featureObject.max_energy += 0.2;
      break;
    case wind < 25:
      featureObject.max_energy += 0.2;
      break;
    default:
      console.log("set DEFAULT WIND");
  }

  return featureObject;
};

// List of spotify preset genres to seed the recommendations request
const spotifyGenres = [
  "acoustic",
  "alternative",
  "chill",
  "classical",
  "club",
  "country",
  "dance",
  "deep-house",
  "disco",
  "edm",
  "electronic",
  "folk",
  "french",
  "funk",
  "happy",
  "hip-hop",
  "house",
  "indie-pop",
  "jazz",
  "k-pop",
  "latin",
  "movies",
  "party",
  "pop",
  "piano",
  "punk",
  "r-n-b",
  "rainy-day",
  "road-trip",
  "rock",
  "romance",
  "sad",
  "soul",
  "study",
  "summer",
  "work-out"
];

module.exports = { FeatureWeather, spotifyGenres };
