import React, { useContext, useEffect, useRef, useState } from "react";
import { FaGuitar, FaTools, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "./App";

const SideMenu = () => {
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
    <aside className="side-menu">
      <button
        type="button"
        className={`side-menu-widget ${
          activeSection === "page" && activePage === 1 ? "active" : ""
        }`}
        onClick={() => changePage(1)}
      >
        <span className="side-menu-icon">
          <FaGuitar />
        </span>
        <span className="side-menu-label">Page 1</span>
      </button>

      <button
        type="button"
        className={`side-menu-widget ${
          activeSection === "page" && activePage === 2 ? "active" : ""
        }`}
        onClick={() => changePage(2)}
      >
        <span className="side-menu-icon">
          <FaGuitar />
        </span>
        <span className="side-menu-label">Page 2</span>
      </button>

      <button
        type="button"
        className={`side-menu-widget ${
          activeSection === "page" && activePage === 3 ? "active" : ""
        }`}
        onClick={() => changePage(3)}
      >
        <span className="side-menu-icon">
          <FaGuitar />
        </span>
        <span className="side-menu-label">Page 3</span>
      </button>

      <button
        type="button"
        className={`side-menu-widget side-menu-tools ${
          activeSection === "tools" ? "active" : ""
        }`}
        onClick={() => scrollToSection("tools-section", "tools")}
      >
        <span className="side-menu-icon">
          <FaTools />
        </span>
        <span className="side-menu-label">Tools</span>
      </button>

      <button
        type="button"
        className={`side-menu-widget side-menu-contact ${
          activeSection === "contact" ? "active" : ""
        }`}
        onClick={() => scrollToSection("contact-section", "contact")}
      >
        <span className="side-menu-icon">
          <FaEnvelope />
        </span>
        <span className="side-menu-label">Contact</span>
      </button>
    </aside>
  );
};

export default SideMenu;
