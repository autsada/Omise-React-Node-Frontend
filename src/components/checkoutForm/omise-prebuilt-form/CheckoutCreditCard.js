import React, { Component } from "react";
import Script from "react-load-script";

import "./Checkout.css";

let OmiseCard;

export class Checkout extends Component {
  handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5ex05ynxfnnc33txbyx",
      currency: "thb",
      frameLabel: "Sabai Shop",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise"
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: []
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const {cart, createCreditCardCharge} = this.props
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: cart.amount,
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token)
      },
      onFormClosed: () => {},
    })
  }

  handleClick = e => {
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseCardHandler()
  };

  render() {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form>
          <button
            id="credit-card"
            className="btn"
            type="button"
            onClick={this.handleClick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
