import React from "react";
import { FaYoutube } from "react-icons/fa";
import Chords from "./Chords";
import Strum from "./Strum";
import ScrollIntoView from "react-scroll-into-view";
import { Link, useNavigate } from "react-router-dom";
const Song = ({ song }) => {
  const { id, title, lyrics, chords, strumming } = song;
  const navigate = useNavigate();
  const page = id < 21 ? 1 : id < 41 ? 2 : id < 61 ? 3 : 4;
  return (
    <ScrollIntoView className="song" selector=".active">
      <Link to={`/main/${page}/${id}`}>
        <span className="span center song-number">{id}.</span>
        <span className="span song-title">
          <i>{title}</i>
        </span>
        {lyrics && (
          <button
            className="btn btn-link px-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/lyrics/${page}/${id}`);
            }}
          >
            <FaYoutube color="deepskyblue" size={26} />
          </button>
        )}
        <span className="span center chords-wrapper">
          {Array.isArray(chords) &&
            chords.map((chord, index) => (
              <Chords key={`${id}-${chord}-${index}`} chords={chord} />
            ))}
        </span>
        <Strum strumming={strumming} />
      </Link>
    </ScrollIntoView>
  );
};
export default Song;
