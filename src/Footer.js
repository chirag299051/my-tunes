import React, { useContext, useState } from "react";
import fb from "./assets/fb.png";
import insta from "./assets/insta.png";
import yt from "./assets/yt.png";
import linkedin from "./assets/linkedin.png";
import { context } from "./App";
const Footer = () => {
  const { setShowSupportModal } = useContext(context);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const scrollToContact = () => {
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("contact-name");
    contactForm?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setTimeout(() => {
      nameInput?.focus({
        preventScroll: true,
      });
    }, 600);
  };
  return (
    <footer id="contact-section" className="footer">
      <div className="footer-content">
        <section className="footer-section footer-lessons">
          <h2>Beginner Guitar Lessons</h2>
          <ul className="footer-lessons-list">
            <li>Zero to Hero Guitarist</li>
            <li>Weekend Guitar Classes</li>
            <li>Online Classes Available</li>
            <li>Learn Chords, Strumming & Songs</li>
            <li>Step-by-Step Learning Approach</li>
            <li>Contact for Schedule & More Information</li>
          </ul>
          <button
            type="button"
            className="footer-price-cta"
            onClick={scrollToContact}
          >
            <span className="footer-price-cta-text">Get Started</span>
            {/* <span className="footer-price-cta-text">Get Started with</span>
            <span className="footer-price">
              ₹500
              <span>/month</span>
            </span> */}
          </button>
        </section>
        <section id="contact-form" className="footer-section footer-contact">
          <div className="footer-contact-heading">
            <span className="footer-contact-badge">START LEARNING</span>
            <h2>Interested in Guitar Lessons?</h2>
            <p className="footer-contact-description">
              Leave your details and I'll get in touch with you.
            </p>
          </div>
          <form className="footer-contact-form" onSubmit={handleSubmit}>
            <div className="footer-form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="footer-form-group">
              <label htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>
            <div className="footer-form-group footer-message-group">
              <label htmlFor="contact-message">Message (optional)</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Anything you'd like to ask?"
                rows="2"
              />
            </div>
            <div className="footer-form-actions">
              <button type="submit" className="footer-submit-btn">
                Contact Me
              </button>
              <button
                type="button"
                className="support footer-support-btn"
                onClick={() => setShowSupportModal(true)}
              >
                Support This Project
              </button>
            </div>
          </form>
        </section>
      </div>
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
            <img
              src={linkedin}
              alt="LinkedIn"
              className="footer-social-image"
            />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <a href="https://chirag299051.github.io/">
          Copyright © 2026 - <span id="c">Chirag Singh</span>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
