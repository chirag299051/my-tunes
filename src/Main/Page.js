import React from "react";
import Song from "./Song";
const Page = ({ songs }) => {
  const firstColumn = songs.slice(0, 10);
  const secondColumn = songs.slice(10, 20);
  const renderHeading = () => (
    <h5 className="heading">
      <span className="span center">#</span>
      <span className="span">Title</span>
      <span className="span center">Lyrics</span>
      <span className="span center">Chords</span>
      <span className="span center">Strumming</span>
    </h5>
  );
  return (
    <div className="page">
      <div className="part">
        {renderHeading()}
        {firstColumn.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
      <div className="part">
        {renderHeading()}
        {secondColumn.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};
export default Page;
