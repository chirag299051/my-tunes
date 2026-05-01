import React, { useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { context } from "./App";
import Modal from "react-modal";
import { FaPlay } from "react-icons/fa";
import capo from "./assets/capo.png";
import got from "./assets/tabs/GOT Theme.jpg";
import { Typeahead } from "react-bootstrap-typeahead";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { options } = useContext(context);

  const [singleSelections, setSingleSelections] = useState([]);
  const typeaheadRef = useRef(null);

  const [showTabs, setShowTabs] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // 🔥 unified modal state
  const [modal, setModal] = useState(null);
  // { type: "chords" | "capo" | "tabs", data?: any }

  const navigate = useNavigate();

  const tabsClick = (img) => {
    setModal({ type: "tabs", data: img });
  };

  useEffect(() => {
    if (singleSelections[0]) {
      const id = singleSelections[0].id;
      const page =
        id < 1 ? 0 : id < 21 ? 1 : id < 41 ? 2 : id < 61 ? 3 : id < 100 ? 4 : 5;

      navigate(`/main/${page}/${id}`);
      typeaheadRef.current.blur();
      setSingleSelections([]);
    }
  }, [singleSelections]);

  const songs = options.map((x) => ({
    id: x.id,
    label: x.title,
  }));

  // ✅ unified modal styles
  const getModalStyles = (type) => {
    const base = {
      overlay: { backgroundColor: "rgba(0,0,0,0.8)" },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        border: "none",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "black",
      },
    };

    if (type === "tabs") {
      return {
        ...base,
        content: {
          ...base.content,
          width: "95vw",
          height: "90vh",
          padding: 0,
        },
      };
    }

    if (type === "capo") {
      return {
        ...base,
        content: {
          ...base.content,
          width: "fit-content",
          maxWidth: "90vw",
          maxHeight: "90vh",
        },
      };
    }

    if (type === "chords") {
      return {
        ...base,
        content: {
          ...base.content,
          width: "380px",
          height: "600px",
        },
      };
    }

    return base;
  };

  // ✅ unified modal content
  const renderModalContent = () => {
    if (!modal) return null;

    switch (modal.type) {
      case "chords":
        return (
          <iframe
            src="https://guitarapp.com/chords/embedtool?labels=fingers&colors=two"
            title="Chord Tool"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "10px",
            }}
          />
        );

      case "capo":
        return (
          <img
            src={capo}
            alt="capo"
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "80vh",
              width: "auto",
              height: "auto",
            }}
          />
        );

      case "tabs":
        return (
          <img
            src={modal.data}
            alt="tab"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="header">
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/my-tunes">my Tunes</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ flexGrow: "0", flexBasis: "100%" }}
          >
            <Nav className="me-auto">
              {/* LEFT */}
              <div className="page-links">
                <Link to="/main/0/0.1" className="strumming-btn">
                  STRUMMING
                </Link>

                <DropdownButton
                  show={showTabs}
                  onMouseEnter={() => setShowTabs(true)}
                  onMouseLeave={() => setShowTabs(false)}
                  size="sm"
                  variant="dark"
                  title="Tabs"
                >
                  <Dropdown.Item onClick={() => tabsClick(got)}>
                    GOT Theme
                  </Dropdown.Item>
                </DropdownButton>
              </div>

              {/* SEARCH */}
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

              {/* RIGHT */}
              <div className="extra-links">
                <Link to="/main/4/61" className="strumming-btn">
                  LEAD
                </Link>

                <Link to="/main/5/101" className="page-btn">
                  <FaPlay size={14} />
                  &nbsp; Extras
                </Link>

                <div className="spacing"></div>

                <DropdownButton
                  show={showMore}
                  onMouseEnter={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                  size="sm"
                  variant="dark"
                  title="More"
                >
                  <Dropdown.Item onClick={() => setModal({ type: "capo" })}>
                    Capo Chart
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => setModal({ type: "chords" })}>
                    Chords
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔥 SINGLE MODAL */}
      <Modal
        isOpen={!!modal}
        onRequestClose={() => setModal(null)}
        style={getModalStyles(modal?.type)}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Header;
