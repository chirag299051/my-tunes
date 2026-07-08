import React, { useState } from "react";
import Modal from "react-modal";
import { FaMusic } from "react-icons/fa";
import capo from "./assets/capo.png";

const Tools = () => {
  const [showCapoChart, setShowCapoChart] = useState(false);

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

      width: "fit-content",
      maxWidth: "90vw",
      maxHeight: "90vh",

      transform: "translate(-50%, -50%)",

      padding: "12px",

      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "24px",

      background: "rgba(12, 20, 35, 0.82)",

      boxShadow:
        "0 32px 100px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.08)",

      overflow: "hidden",
    },
  };

  return (
    <>
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

        <button
          type="button"
          className="capo-chart-button"
          onClick={() => setShowCapoChart(true)}
        >
          <span className="capo-chart-button-icon">
            <FaMusic />
          </span>

          <span className="capo-chart-button-content">
            <strong>Capo Chart</strong>

            <span>View Guitar Capo Cheat Sheet</span>
          </span>

          <span className="capo-chart-button-action">Open Chart</span>
        </button>
      </section>

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
