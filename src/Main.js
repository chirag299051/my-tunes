import React, { useContext } from "react";
import Page from "./Page";
import Modal from "react-bootstrap/Modal";
import { context } from "./App";
import Song from "./Song";
import Playlist from "./Playlist";
import Player from "./Player";

const Main = () => {
  const {
    data,
    currSongId,
    setCurrSongId,
    showModal,
    setShowModal,
    modalType,
    modalPage,
  } = useContext(context);
  const { songs1, songs2, extras } = data;
  const song =
    modalPage === 3
      ? extras.find((x) => x.id === currSongId)
      : [...songs1, ...songs2].find((x) => x.id === currSongId);

  return (
    <div className="main">
      <div className="wrapper">
        <Page songs={songs1} page={1} />
        <Page songs={songs2} page={2} />
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          contentClassName="my-modal"
          centered
        >
          <Modal.Header className="modalHeader" closeButton>
            {song && <Song key={Math.random()} song={song}></Song>}
          </Modal.Header>
          <Modal.Body className="grid">
            <Playlist
              songs={
                modalPage === 1 ? songs1 : modalPage === 2 ? songs2 : extras
              }
            />
            <div className="player">
              {song && (
                <Player url={modalType === "title" ? song.url : song.lyrics} />
              )}
            </div>
          </Modal.Body>
        </Modal>
        ;
      </div>
    </div>
  );
};

export default Main;
