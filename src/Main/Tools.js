import React, { useState } from "react";
import Modal from "react-modal";
import { FaMusic } from "react-icons/fa";
import { FaGuitar } from "react-icons/fa";
import capo from "../assets/capo.png";
import fretboard from "../assets/fretboard.png";
const Tools = () => {
  const [showCapoChart, setShowCapoChart] = useState(false);
  const [showFretboard, setShowFretboard] = useState(false);
  const fretboardModalStyles = {
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
      width: "95vw",
      maxWidth: "1600px",
      height: "auto",
      maxHeight: "90vh",
      transform: "translate(-50%, -50%)",
      padding: "12px",
      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "24px",
      background: "rgba(12, 20, 35, 0.82)",
      boxShadow:
        "0 32px 100px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.08)",
      overflow: "auto",
    },
  };
  const capoModalStyles = {
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
      width: "calc(100vw - 24px)",
      maxWidth: "900px",
      maxHeight: "calc(100vh - 24px)",
      transform: "translate(-50%, -50%)",
      padding: "12px",
      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "20px",
      background: "rgba(12, 20, 35, 0.82)",
      boxShadow:
        "0 32px 100px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.08)",
      overflow: "auto",
    },
  };
  return (
    <>
      <div className="tools-section-wrapper">
        <div className="page-indicator tools-indicator">Tools</div>
        <section id="tools-section" className="tools">
          <div className="tools-grid">
            <div className="tool-card metronome">
              <iframe
                src="https://guitarapp.com/metronome.html?embed=true&tempo=90&timeSignature=2&pattern=1"
                title="Metronome"
              />
            </div>
            <div className="tool-card chord-tool">
              <iframe
                src="https://guitarapp.com/chords/embedtool?labels=fingers&colors=two"
                title="Chord Tool"
                scrolling="no"
              />
            </div>
            <div className="tool-card tuner">
              <iframe
                src="https://guitarapp.com/tuner.html?embed=true&instrument=0&tuning=0"
                allow="microphone"
                title="Tuner"
              />
            </div>
          </div>
          <div className="tools-chart-buttons">
            <button
              type="button"
              className="tools-chart-button"
              onClick={() => setShowFretboard(true)}
            >
              <span className="tools-chart-button-icon">
                <FaGuitar />
              </span>
              <span>Notes on Fretboard</span>
            </button>
            <button
              type="button"
              className="tools-chart-button"
              onClick={() => setShowCapoChart(true)}
            >
              <span className="tools-chart-button-icon">
                <FaMusic />
              </span>
              <span>Capo Chart</span>
            </button>
          </div>
        </section>
      </div>
      <Modal
        isOpen={showFretboard}
        onRequestClose={() => setShowFretboard(false)}
        style={fretboardModalStyles}
        closeTimeoutMS={150}
      >
        <img
          src={fretboard}
          alt="Guitar fretboard notes chart"
          className="tools-fretboard-modal-image"
        />
      </Modal>
      <Modal
        isOpen={showCapoChart}
        onRequestClose={() => setShowCapoChart(false)}
        style={capoModalStyles}
        closeTimeoutMS={150}
      >
        <img src={capo} alt="Capo chart" className="tools-capo-modal-image" />
      </Modal>
    </>
  );
};
export default Tools;
