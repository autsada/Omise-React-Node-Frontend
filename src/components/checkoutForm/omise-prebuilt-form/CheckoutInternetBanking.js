import React, { Component } from "react";

import "./Checkout.css";

export class CheckoutInternetBanking extends Component {
  render() {
    return (
      <div className="own-form">
          <button
            className="btn internet-banking"
            type="button"
          >
            Pay with Internet Banking / Others
          </button>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
