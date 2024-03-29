import React, { useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { context } from "./App";
import Modal from "react-modal";
import { FaPlay } from "react-icons/fa";
import capo from "./assets/capo.png";
import { Typeahead } from "react-bootstrap-typeahead";

const Header = () => {
  const [chordModal, setChordModal] = useState(false);
  const [capoModal, setCapoModal] = useState(false);
  const {
    setCurrSongId,
    showModal,
    setShowModal,
    setModalType,
    setModalPage,
    options,
  } = useContext(context);
  const [singleSelections, setSingleSelections] = useState([]);
  const typeaheadRef = useRef(null);

  useEffect(() => {
    if (singleSelections[0]) {
      const id = singleSelections[0].id;
      setShowModal(true);
      setCurrSongId(id);
      setModalType("title");
      setModalPage(id < 21 ? 1 : id < 41 ? 2 : id < 61 ? 3 : 4);
    }
    typeaheadRef.current.blur();
  }, [
    singleSelections,
    setShowModal,
    setCurrSongId,
    setModalType,
    setModalPage,
  ]);

  useEffect(() => {
    setSingleSelections([]);
  }, [showModal]);

  const songs = options.map((x) => ({
    id: x.id,
    label: x.title,
  }));

  const setPage = (page) => {
    setShowModal(true);
    setCurrSongId(page === 1 ? 1 : page === 2 ? 21 : page === 3 ? 41 : null);
    setModalType("title");
    setModalPage(page);
  };

  const handleCapoClick = () => {
    setCapoModal(true);
  };

  const handleChordsClick = () => {
    setChordModal(true);
  };

  const handleExtrasClick = () => {
    setShowModal(true);
    setCurrSongId(61);
    setModalType("title");
    setModalPage(4);
  };

  const customStylesChords = {
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

  const customStylesCapo = {
    overlay: { backgroundColor: "rgb(0,0,0,.9)" },
    content: {
      width: "50vw",
      height: "80vh",
      margin: "auto",
    },
  };

  return (
    <div className="header">
      <Navbar bg="dark" className="bg-body-dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/my-tunes/">my Tunes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=""
            style={{ flexGrow: "0", flexBasis: "100%" }}
          >
            <Nav className="me-auto">
              <div className="page-links">
                <Nav.Link className="page-btn" onClick={() => setPage(1)}>
                  <FaPlay size={14} /> &nbsp;Page 1
                </Nav.Link>
                <Nav.Link className="page-btn" onClick={() => setPage(2)}>
                  <FaPlay size={14} /> &nbsp;Page 2
                </Nav.Link>
                <Nav.Link className="page-btn" onClick={() => setPage(3)}>
                  <FaPlay size={14} /> &nbsp;Page 3
                </Nav.Link>
              </div>

              <div className="search">
                <Typeahead
                  ref={typeaheadRef}
                  id="basic-typeahead-single"
                  labelKey={(option) => `${option.id}.  ${option.label}`}
                  onChange={setSingleSelections}
                  options={songs}
                  placeholder="Search a song..."
                  selected={singleSelections}
                />
              </div>

              <div className="extra-links">
                <Nav.Link className="extra-btn" onClick={handleExtrasClick}>
                  Extras
                </Nav.Link>
                <Nav.Link className="extra-btn" onClick={handleCapoClick}>
                  Capo Chart
                </Nav.Link>
                <Nav.Link className="extra-btn" onClick={handleChordsClick}>
                  Chords
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {chordModal && (
        <Modal
          isOpen={chordModal}
          onRequestClose={() => setChordModal(false)}
          style={customStylesChords}
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
      {capoModal && (
        <Modal
          isOpen={capoModal}
          onRequestClose={() => setCapoModal(false)}
          style={customStylesCapo}
          contentLabel="Example Modal"
        >
          <img src={capo} style={{ width: "100%", height: "100%" }} alt="img" />
        </Modal>
      )}
    </div>
  );
};

export default Header;
