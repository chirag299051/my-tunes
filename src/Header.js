import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { context } from "./App";
import Modal from "react-modal";

const Header = () => {
  const [chordModal, setChordModal] = useState(false);
  const { setCurrSongId, setShowModal, setModalType, setModalPage } =
    useContext(context);

  const handleExtrasClick = () => {
    setShowModal(true);
    setCurrSongId(1);
    setModalType("title");
    setModalPage(3);
  };

  const handleChordsClick = () => {
    setChordModal(true);
  };

  const customStyles = {
    overlay: { backgroundColor: "rgb(255,255,255,.7)" },
    content: {
      backgroundColor: "black",
      border: "none",
      borderRadius: "10px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="header">
      <Navbar bg="dark" className="bg-body-dark">
        <Container>
          <Navbar.Brand href="/my-tunes/">my Tunes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleChordsClick}>Chords</Nav.Link>
            <Nav.Link onClick={handleExtrasClick}>Extras</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {chordModal && (
        <Modal
          isOpen={chordModal}
          onRequestClose={() => setChordModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <iframe
            src="https://guitarapp.com/chords/embedtool?labels=fingers&colors=two"
            title="Chord Tool"
            style={{
              width: "360px",
              height: "560px",
              borderStyle: "none",
              borderRadius: "10px",
            }}
          ></iframe>
        </Modal>
      )}
    </div>
  );
};

export default Header;
