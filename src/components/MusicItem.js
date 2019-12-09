import React from "react";

const MusicItem = props => (
  <a className={"song-listing--item"}>
    <div className={"song-listing--item-album-img"}>
      <img
        src={props.trackData.album.images[1].url}
        alt={props.trackData.album.name}
      />
    </div>
    <div className={"song-listing--info-wrapper"}>
      <div className={"song-listing--trackname"}>{props.trackData.name}</div>
      <div className={"song-listing--artist"}>
        {props.trackData.artists[0].name}
      </div>
    </div>
  </a>
);
export default MusicItem;
