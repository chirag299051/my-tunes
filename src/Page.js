import React from "react";
import Song from "./Song";

const Page = ({ songs, page, isShuffle }) => {
  const part1 = isShuffle
    ? songs.slice(0, 15)
    : songs.filter((x) => {
        if (page === 1) return x.id <= 15;
        if (page === 2) return x.id <= 35;
        if (page === 3) return x.id <= 55;
      });

  const part2 = isShuffle
    ? songs.slice(15)
    : songs.filter((x) => {
        if (page === 1) return x.id > 15;
        if (page === 2) return x.id > 35;
        if (page === 3) return x.id > 55;
      });

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
        {part1.map((x) => (
          <Song key={Math.random()} song={x}></Song>
        ))}
      </div>

      <div className="part">
        <h5 className="heading">
          <span className="span center">#</span>
          <span className="span">Title</span>
          <span className="span center">Lyrics</span>
          <span className="span center">Chords</span>
          <span className="span">Strumming</span>
        </h5>
        {part2.map((x) => (
          <Song key={Math.random()} song={x}></Song>
        ))}
        {page === 1 && (
          <div className="tools">
            <div className="tuner">
              <iframe
                src="https://guitarapp.com/tuner.html?embed=true&instrument=0&tuning=0"
                allow="microphone"
                title="Tuner"
                style={{
                  width: "360px",
                  height: "520px",
                  borderStyle: "none",
                  borderRadius: "10px",
                }}
              ></iframe>
            </div>
            <div className="metronome">
              <iframe
                src="https://guitarapp.com/metronome.html?embed=true&tempo=90&timeSignature=2&pattern=1"
                title="Metronome"
                style={{
                  width: "360px",
                  height: "520px",
                  borderStyle: "none",
                  borderRadius: "10px",
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
