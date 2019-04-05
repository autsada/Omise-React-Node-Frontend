import React, { Component } from "react";
import Script from "react-load-script";

import { publicKey } from "../../../confidential/keys";

import "./Checkout.css";

let OmiseCard;

export class CheckoutInternetBanking extends Component {
  handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey,
      currency: "thb",
      frameLabel: "Sabai Shop",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise"
    });
  };

  internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        "bill_payment_tesco_lotus",
        "alipay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    });
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart, createInternetBankingCharge} = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(cart.email, cart.name, cart.amount, token)
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.internetBankingConfigure();
    this.omiseCardHandler();
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
            id="internet-banking"
            className="btn internet-banking"
            type="button"
            disabled={this.props.cart.amount === 0}
            onClick={this.handleClick}
          >
            Pay with Internet Banking / Others
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
