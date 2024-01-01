import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import Chords from "./Chords";
import { context } from "./App";
import ScrollIntoView from "react-scroll-into-view";

const Song = ({ song }) => {
  const { id, title, url, lyrics, chords, strumming } = song;
  const { setCurrSongId, setShowModal, setModalType, setModalPage } =
    useContext(context);

  const handleTitleClick = () => {
    setShowModal(true);
    setCurrSongId(id);
    setModalType("title");
    setModalPage(id < 21 ? 1 : 2);
  };

  const handleLyricsClick = () => {
    setShowModal(true);
    setCurrSongId(id);
    setModalType("lyrics");
    setModalPage(id < 21 ? 1 : 2);
  };

  return (
    <ScrollIntoView
      className="song"
      onClick={handleTitleClick}
      selector=".active"
    >
      <span className="span center">{id}.</span>
      <span className="span">
        <i>{title}</i>
      </span>
      {lyrics && (
        <span
          className="span center"
          onClick={(e) => {
            e.stopPropagation();
            handleLyricsClick();
          }}
        >
          <FaYoutube color="deepskyblue" size={26} />
        </span>
      )}
      <span className="span center chords-wrapper">
        {Array.isArray(chords) &&
          chords.map((x) => <Chords key={Math.random()} chords={x} />)}
      </span>
      <span className="span">{strumming}</span>
    </ScrollIntoView>
  );
};

export default Song;
