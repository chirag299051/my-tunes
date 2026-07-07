import React, { useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-modal";
import { Typeahead } from "react-bootstrap-typeahead";
import { FaPlay, FaMusic, FaChevronDown, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { context } from "./App";
import capo from "./assets/capo.png";
import got from "./assets/tabs/GOT Theme.jpg";

const Header = () => {
  const { options } = useContext(context);

  const [singleSelections, setSingleSelections] = useState([]);
  const [showTabs, setShowTabs] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [modal, setModal] = useState(null);

  const typeaheadRef = useRef(null);
  const tabsTimeoutRef = useRef(null);
  const moreTimeoutRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!singleSelections[0]) return;

    const id = singleSelections[0].id;

    const page =
      id < 1 ? 0 : id < 21 ? 1 : id < 41 ? 2 : id < 61 ? 3 : id < 100 ? 4 : 5;

    navigate(`/main/${page}/${id}`);

    typeaheadRef.current?.blur();
    setSingleSelections([]);
  }, [singleSelections, navigate]);

  useEffect(() => {
    return () => {
      clearTimeout(tabsTimeoutRef.current);
      clearTimeout(moreTimeoutRef.current);
    };
  }, []);

  const songs = options.map((song) => ({
    id: song.id,
    label: song.title,
  }));

  /*
   * TABS DROPDOWN
   */

  const openTabsDropdown = () => {
    clearTimeout(tabsTimeoutRef.current);
    setShowTabs(true);
  };

  const closeTabsDropdown = () => {
    clearTimeout(tabsTimeoutRef.current);

    tabsTimeoutRef.current = setTimeout(() => {
      setShowTabs(false);
    }, 200);
  };

  /*
   * MORE DROPDOWN
   */

  const openMoreDropdown = () => {
    clearTimeout(moreTimeoutRef.current);
    setShowMore(true);
  };

  const closeMoreDropdown = () => {
    clearTimeout(moreTimeoutRef.current);

    moreTimeoutRef.current = setTimeout(() => {
      setShowMore(false);
    }, 200);
  };

  /*
   * MODALS
   */

  const openTabs = (img) => {
    setShowTabs(false);

    setModal({
      type: "tabs",
      data: img,
    });
  };

  const getModalStyles = (type) => {
    const base = {
      overlay: {
        background: "rgba(2, 8, 20, 0.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 2000,
      },

      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",

        transform: "translate(-50%, -50%)",

        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "24px",

        padding: "12px",

        background: "rgba(12, 20, 35, 0.82)",

        boxShadow:
          "0 32px 100px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.08)",

        overflow: "hidden",
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

          width: "min(380px, 92vw)",
          height: "min(600px, 85vh)",
        },
      };
    }

    return base;
  };

  const renderModalContent = () => {
    if (!modal) return null;

    switch (modal.type) {
      case "chords":
        return (
          <iframe
            src="https://guitarapp.com/chords/embedtool?labels=fingers&colors=two"
            title="Chord Tool"
            className="header-modal-frame"
          />
        );

      case "capo":
        return (
          <img
            src={capo}
            alt="Capo chart"
            className="header-modal-image capo-image"
          />
        );

      case "tabs":
        return (
          <img
            src={modal.data}
            alt="Guitar tab"
            className="header-modal-image tabs-image"
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <header className="site-header">
        <Navbar expand="lg" className="glass-navbar">
          <Container fluid className="header-container">
            {/* BRAND */}

            <a href="/" className="brand">
              <span className="brand-icon">
                <FaMusic />
              </span>

              <span className="brand-text">
                my<span>Tunes</span>
              </span>
            </a>

            <Navbar.Toggle
              aria-controls="main-navigation"
              className="glass-toggler"
            />

            <Navbar.Collapse id="main-navigation">
              <Nav className="header-navigation">
                {/* LEFT NAVIGATION */}

                <div className="header-nav-group">
                  <Link to="/main/0/0.1" className="glass-nav-link">
                    Strumming
                  </Link>

                  <Dropdown
                    className="header-dropdown"
                    show={showTabs}
                    onMouseEnter={openTabsDropdown}
                    onMouseLeave={closeTabsDropdown}
                  >
                    <Dropdown.Toggle
                      as="button"
                      className="glass-nav-link glass-dropdown-toggle"
                    >
                      Tabs
                      <FaChevronDown className="dropdown-chevron" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className="glass-dropdown-menu"
                      onMouseEnter={openTabsDropdown}
                      onMouseLeave={closeTabsDropdown}
                    >
                      <Dropdown.Item onClick={() => openTabs(got)}>
                        GOT Theme
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* SEARCH */}

                <div className="header-search">
                  <FaSearch className="header-search-icon" />

                  <Typeahead
                    ref={typeaheadRef}
                    id="song-search"
                    labelKey={(option) => `${option.id}.  ${option.label}`}
                    onChange={setSingleSelections}
                    options={songs}
                    placeholder="Search songs"
                    selected={singleSelections}
                    clearButton
                  />
                </div>

                {/* RIGHT NAVIGATION */}

                <div className="header-nav-group header-nav-right">
                  <Link to="/main/4/61" className="glass-nav-link">
                    Lead
                  </Link>

                  <Link to="/main/5/101" className="glass-nav-link extras-link">
                    <FaPlay className="play-icon" />
                    Extras
                  </Link>

                  <Dropdown
                    className="header-dropdown"
                    show={showMore}
                    onMouseEnter={openMoreDropdown}
                    onMouseLeave={closeMoreDropdown}
                  >
                    <Dropdown.Toggle
                      as="button"
                      className="glass-nav-link glass-dropdown-toggle"
                    >
                      More
                      <FaChevronDown className="dropdown-chevron" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      align="end"
                      className="glass-dropdown-menu"
                      onMouseEnter={openMoreDropdown}
                      onMouseLeave={closeMoreDropdown}
                    >
                      <Dropdown.Item
                        onClick={() => {
                          setShowMore(false);
                          setModal({ type: "capo" });
                        }}
                      >
                        Capo Chart
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => {
                          setShowMore(false);
                          setModal({ type: "chords" });
                        }}
                      >
                        Chords
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <Modal
        isOpen={!!modal}
        onRequestClose={() => setModal(null)}
        style={getModalStyles(modal?.type)}
        closeTimeoutMS={150}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default Header;
