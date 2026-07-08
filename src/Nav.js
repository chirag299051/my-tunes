import React, { useContext, useEffect, useRef, useState } from "react";
import { FaGuitar, FaTools, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "./App";
const Nav = () => {
  const { activePage, setActivePage } = useContext(context);
  const [activeSection, setActiveSection] = useState("page");
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      const toolsSection = document.getElementById("tools-section");
      const contactSection = document.getElementById("contact-section");
      if (!toolsSection || !contactSection) return;
      const activationPoint = window.innerHeight * 0.45;
      const toolsTop =
        toolsSection.getBoundingClientRect().top + window.scrollY;
      const contactTop =
        contactSection.getBoundingClientRect().top + window.scrollY;
      const currentPosition = window.scrollY + activationPoint;
      if (currentPosition >= contactTop) {
        setActiveSection("contact");
        return;
      }
      if (currentPosition >= toolsTop) {
        setActiveSection("tools");
        return;
      }
      setActiveSection("page");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [location.pathname]);
  const startProgrammaticScroll = (section) => {
    isProgrammaticScroll.current = true;
    setActiveSection(section);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      window.dispatchEvent(new Event("scroll"));
    }, 700);
  };
  const changePage = (page) => {
    setActivePage(page);
    startProgrammaticScroll("page");
    const scroll = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 100);
      return;
    }
    scroll();
  };
  const scrollToSection = (sectionId, section) => {
    startProgrammaticScroll(section);
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 100);
      return;
    }
    scroll();
  };
  return (
    <div className="header-widget-zone">
      <div className="header-widget-nav">
        <button
          type="button"
          className={`nav-widget-button nav-widget-page ${
            activeSection === "page" && activePage === 1 ? "active" : ""
          }`}
          onClick={() => changePage(1)}
        >
          <FaGuitar />
          <span>Page 1</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-page ${
            activeSection === "page" && activePage === 2 ? "active" : ""
          }`}
          onClick={() => changePage(2)}
        >
          <FaGuitar />
          <span>Page 2</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-page ${
            activeSection === "page" && activePage === 3 ? "active" : ""
          }`}
          onClick={() => changePage(3)}
        >
          <FaGuitar />
          <span>Page 3</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-tools ${
            activeSection === "tools" ? "active" : ""
          }`}
          onClick={() => scrollToSection("tools-section", "tools")}
        >
          <FaTools />
          <span>Tools</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-contact ${
            activeSection === "contact" ? "active" : ""
          }`}
          onClick={() => scrollToSection("contact-section", "contact")}
        >
          <FaEnvelope />
          <span>Contact</span>
        </button>
      </div>
    </div>
  );
};
export default Nav;
