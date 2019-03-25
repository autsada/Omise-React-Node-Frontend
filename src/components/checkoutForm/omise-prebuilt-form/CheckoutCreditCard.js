import React, { Component } from "react";

import "./Checkout.css";

export class Checkout extends Component {
  render() {
    return (
      <div className="own-form">
        <button className="btn" type="button">
          Pay with Credit Card
        </button>
      </div>
    );
  }
}

export default Checkout;
