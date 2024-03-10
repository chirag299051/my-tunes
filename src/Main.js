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
    isShuffle,
    setIsShuffle,
    shuffled,
    currSongId,
    showModal,
    setShowModal,
    modalType,
    modalPage,
  } = useContext(context);
  const { songs1, songs2, songs3, extras } = data;

  const btnClass = isShuffle ? "btn-shuffle on" : "btn-shuffle";

  const song =
    modalPage === 4
      ? extras.find((x) => x.id === currSongId)
      : [...songs1, ...songs2, ...songs3].find((x) => x.id === currSongId);

  // useEffect(() => {
  //   modalPage === 4 && setCurrSongId(61);
  // }, [modalPage]);

  const handleShuffle = () => {
    if (isShuffle) {
      window.location.reload();
      return;
    }
    setIsShuffle(!isShuffle);
  };

  return (
    <div className="main">
      <div className="wrapper">
        <button className={btnClass} onClick={handleShuffle}>
          SHUFFLE
        </button>
        <Page
          songs={!isShuffle ? songs1 : shuffled}
          isShuffle={isShuffle}
          page={1}
        />
        <Page songs={songs2} page={2} />
        <Page songs={songs3} page={3} />
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          contentClassName="my-modal"
          centered
        >
          <Modal.Header className="modalHeader" closeButton>
            {song && (
              <Song
                key={Math.random()}
                song={song}
                modalPage={modalPage}
              ></Song>
            )}
          </Modal.Header>
          <Modal.Body className="grid">
            <Playlist
              songs={
                isShuffle
                  ? shuffled
                  : modalPage === 1
                  ? songs1
                  : modalPage === 2
                  ? songs2
                  : modalPage === 3
                  ? songs3
                  : extras
              }
            />
            <div className="player">
              {song && (
                <Player url={modalType === "title" ? song.url : song.lyrics} />
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Main;
