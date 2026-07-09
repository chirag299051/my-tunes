import React, { useEffect, useRef, useState } from "react";
import { FaGuitar, FaTools, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
const Nav = () => {
  const [activeSection, setActiveSection] = useState("page-1");
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sections = [
    { id: "page-1", active: "page-1" },
    { id: "page-2", active: "page-2" },
    { id: "page-3", active: "page-3" },
    { id: "tools-section", active: "tools" },
    { id: "contact-section", active: "contact" },
  ];
  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      const activationPoint = window.scrollY + window.innerHeight * 0.45;
      let currentSection = "page-1";
      sections.forEach(({ id, active }) => {
        const element = document.getElementById(id);
        if (!element) return;
        const sectionTop = element.getBoundingClientRect().top + window.scrollY;
        if (activationPoint >= sectionTop) {
          currentSection = active;
        }
      });
      setActiveSection(currentSection);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
  const scrollToSection = (sectionId, section) => {
    startProgrammaticScroll(section);
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
          className={`nav-widget-button nav-widget-page ${activeSection === "page-1" ? "active" : ""}`}
          onClick={() => scrollToSection("page-1", "page-1")}
        >
          <FaGuitar />
          <span>Page 1</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-page ${activeSection === "page-2" ? "active" : ""}`}
          onClick={() => scrollToSection("page-2", "page-2")}
        >
          <FaGuitar />
          <span>Page 2</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-page ${activeSection === "page-3" ? "active" : ""}`}
          onClick={() => scrollToSection("page-3", "page-3")}
        >
          <FaGuitar />
          <span>Page 3</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-tools ${activeSection === "tools" ? "active" : ""}`}
          onClick={() => scrollToSection("tools-section", "tools")}
        >
          <FaTools />
          <span>Tools</span>
        </button>
        <button
          type="button"
          className={`nav-widget-button nav-widget-contact ${activeSection === "contact" ? "active" : ""}`}
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
