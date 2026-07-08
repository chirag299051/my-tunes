import React from "react";
import Modal from "react-modal";
import { FaPaypal, FaTimes } from "react-icons/fa";
import supportQr from "./assets/support-qr.png";
const SupportModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="support-modal"
      overlayClassName="support-modal-overlay"
      closeTimeoutMS={180}
      contentLabel="Support This Project"
    >
      <button
        type="button"
        className="support-modal-close"
        onClick={onClose}
        aria-label="Close support modal"
      >
        <FaTimes />
      </button>
      <div className="support-modal-content">
        <span className="support-modal-badge">SUPPORT MYTUNES</span>
        <h2>Support This Project</h2>
        <p className="support-modal-description">
          If myTunes has been useful to you, you can support the project using
          UPI or PayPal.
        </p>
        <div className="support-qr-card">
          <img src={supportQr} alt="Paytm and Google Pay UPI QR code" />
          <strong>Scan to Pay with UPI</strong>
          <span>Paytm · Google Pay · Any UPI App</span>
        </div>
        <a
          className="support-paypal-button"
          href="YOUR_PAYPAL_LINK"
          target="_blank"
          rel="noreferrer"
        >
          <FaPaypal />
          <span>Support with PayPal</span>
        </a>
      </div>
    </Modal>
  );
};
export default SupportModal;
