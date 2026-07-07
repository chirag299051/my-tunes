import React from "react";

const Tools = () => {
  return (
    <div id="tools-section" className="tools">
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
        />
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
        />
      </div>
    </div>
  );
};

export default Tools;
