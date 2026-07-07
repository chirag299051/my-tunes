import React from "react";
import Song from "./Song";
import Tools from "./Tools";

const Page = ({ songs, page }) => {
  return (
    <div className="page">
      <div className="part">
        <h5 className="heading">
          <span className="span center">#</span>
          <span className="span">Title</span>
          <span className="span center">Lyrics</span>
          <span className="span center">Chords</span>
          <span className="span">Strumming</span>
        </h5>
        {songs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Page;
