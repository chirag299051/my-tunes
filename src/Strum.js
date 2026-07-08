import React from "react";

const Strum = ({ strumming }) => {
  if (!strumming) return null;
  return (
    <span className="song-strum-button">
      <span>{strumming}</span>
    </span>
  );
};
export default Strum;
