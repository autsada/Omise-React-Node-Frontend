import React, { Component } from "react";

import ChekoutCreditCard from "../components/checkoutForm/omise-prebuilt-form/CheckoutCreditCard";
import CheckoutInternetBanking from "../components/checkoutForm/omise-prebuilt-form/CheckoutInternetBanking";

import "./CheckoutPage.css";

export class CartCheckoutPage extends Component {
  render() {
    const { cart } = this.props;

    return (
      <div className="own-form">
        <div className="cart__summary">
          <h2>Cart Summary</h2>
          <div className="cart-details">
            <h3>Total Amount: </h3>
            <h3>
              <span> {new Intl.NumberFormat().format(cart.amount / 100)} thb</span>
            </h3>
          </div>
        </div>
        <ChekoutCreditCard
          cart={cart}
        />
        <CheckoutInternetBanking
          cart={cart}
        />
        <div className="message">

        </div>
      </div>
    );
  }
}

export default CartCheckoutPage;
