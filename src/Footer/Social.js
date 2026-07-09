import React from "react";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import yt from "../assets/yt.png";
import linkedin from "../assets/linkedin.png";

export const Social = () => {
  return (
    <div className="footer-social-row">
      <div className="footer-social-links">
        <a
          href="https://www.instagram.com/chirag.singh92/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <img src={insta} alt="Instagram" className="footer-social-image" />
        </a>
        <a
          href="https://www.youtube.com/@chiragsingh992"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <img src={yt} alt="Youtube" className="footer-social-image" />
        </a>
        <a
          href="https://www.facebook.com/chirag1509"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <img src={fb} alt="Facebook" className="footer-social-image" />
        </a>
        <a
          href="https://www.linkedin.com/in/chirag9/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src={linkedin} alt="LinkedIn" className="footer-social-image" />
        </a>
      </div>
    </div>
  );
};
