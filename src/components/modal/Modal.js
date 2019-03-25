import React from "react";

import "./Modal.css";

const Modal = ({ closeModal, charge }) => (
  <React.Fragment>
    <div className="modal">
      <header className="modal__header">
        <h3> Thank you for your payment with Internet Banking </h3>
      </header>
      <section className="modal__content">
        <h4>
          Your payment amount is{" "}
          <span className="amount">{new Intl.NumberFormat().format(charge.amount / 100)} Baht</span>, status:{" "}
          <span
            className={
              charge.status === "successful"
                ? "success"
                : charge.status === "failed"
                ? "failed"
                : "pending"
            }
          >
            {charge.status}
          </span>
          . {charge.status === 'failed' && 'Please try again.'}
        </h4>
      </section>
      <section className="modal__action">
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </section>
    </div>
  </React.Fragment>
);

export default Modal;
