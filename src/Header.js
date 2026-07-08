import React, { useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavBootstrap from "react-bootstrap/Nav";
import { Typeahead } from "react-bootstrap-typeahead";
import { FaPlay, FaMusic, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { context } from "./App";
import Nav from "./Nav";
const Header = () => {
  const { options } = useContext(context);
  const [singleSelections, setSingleSelections] = useState([]);
  const typeaheadRef = useRef(null);
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
  const songs = options.map((song) => ({
    id: song.id,
    label: song.title,
  }));
  return (
    <header className="site-header">
      <Navbar expand="lg" className="glass-navbar">
        <Container fluid className="header-container">
          <a href="/my-tunes" className="brand">
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
            <NavBootstrap className="header-navigation">
              <div className="header-nav-group">
                <Link to="/main/0/0.1" className="glass-nav-link">
                  Strumming
                </Link>
                <Link to="/main/4/61" className="glass-nav-link">
                  Lead
                </Link>
                <Link to="/main/5/101" className="glass-nav-link extras-link">
                  <FaPlay className="play-icon" />
                  Extras
                </Link>
              </div>
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
              <Nav />
            </NavBootstrap>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
