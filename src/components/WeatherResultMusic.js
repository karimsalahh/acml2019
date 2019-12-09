import React from "react";
import MusicItem from "../components/MusicItem";
import axios from "axios";
class WeatherResultMusic extends React.Component {
  state = {
    songsSet: false,
    tracks: undefined
  };

  getSpotifySongs = () => {
    return axios({
      url: "http://localhost:5000/api/songs",
      method: "POST",
      data: JSON.stringify({ weatherObj: this.props.weather }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.trackUris = [];
    this.getTracks();
  }

  getTracks = () => {
    this.getSpotifySongs()
      .then(tracks => {
        this.setState(
          {
            tracks: tracks
          },
          () => {
            this.setState({
              songsSet: true
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderSongs = () => {
    if (this.state.songsSet) {
      return (
        <React.Fragment>
          <div className={"recommended-songs--wrapper"}>
            {this.state.tracks.map((result, index) => {
              this.trackUris.push(result.uri);
              return <MusicItem key={index} trackData={result} />;
            })}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={"loading-wrapper"}>
          <div className={"hollow-loader"}>
            <div className={"large-box"}></div>
            <div className={"small-box"}></div>
          </div>
        </div>
      );
    }
  };

  render() {
    return this.renderSongs();
  }
}

export default WeatherResultMusic;
