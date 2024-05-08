import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = ({ songs }) => {
  return (
    <div className="playlist">
      {songs.map((song) => (
        <PlaylistItem key={song.id} item={song} />
      ))}
    </div>
  );
};

export default Playlist;
