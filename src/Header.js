import React, { useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { context } from "./App";
import Modal from "react-modal";
import { FaPlay } from "react-icons/fa";
import capo from "./assets/capo.png";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { modal, setModal, options } = useContext(context);
  const [singleSelections, setSingleSelections] = useState([]);
  const typeaheadRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (singleSelections[0]) {
      const id = singleSelections[0].id;
      const page = id == 0 ? 0 : id < 21 ? 1 : id < 41 ? 2 : id < 61 ? 3 : 4;
      navigate(`/main/${page}/${id}`);
    }
    typeaheadRef.current.blur();
  }, [singleSelections]);

  useEffect(() => {
    setSingleSelections([]);
  }, [modal]);

  const songs = options.map((x) => ({
    id: x.id,
    label: x.title,
  }));

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
          <Navbar.Brand href="/my-tunes">my Tunes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=""
            style={{ flexGrow: "0", flexBasis: "100%" }}
          >
            <Nav className="me-auto">
              <div className="page-links">
                <Link to="/main/1/1" className="page-btn">
                  <FaPlay size={14} /> &nbsp;Page 1
                </Link>
                <Link to="/main/2/21" className="page-btn">
                  <FaPlay size={14} /> &nbsp;Page 2
                </Link>
                <Link to="/main/3/41" className="page-btn">
                  <FaPlay size={14} /> &nbsp;Page 3
                </Link>
                <Link to="/main/0/0" className="strumming-btn">
                  STRUMMING
                </Link>
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
                <Link to="/main/4/61" className="page-btn">
                  <FaPlay size={14} />
                  &nbsp; Extras
                </Link>
                <Nav.Link
                  className="extra-btn"
                  onClick={() => setModal("capo")}
                >
                  Capo Chart
                </Nav.Link>
                <Nav.Link
                  className="extra-btn"
                  onClick={() => setModal("chords")}
                >
                  Chords
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {modal === "chords" && (
        <Modal
          isOpen={modal === "chords"}
          onRequestClose={() => setModal(null)}
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
      {modal === "capo" && (
        <Modal
          isOpen={modal === "capo"}
          onRequestClose={() => setModal(null)}
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
