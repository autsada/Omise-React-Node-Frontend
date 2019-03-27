import React, { Component } from "react";
import axios from 'axios'

import ChekoutCreditCard from "../components/checkoutForm/omise-prebuilt-form/CheckoutCreditCard";
import CheckoutInternetBanking from "../components/checkoutForm/omise-prebuilt-form/CheckoutInternetBanking";

import "./CheckoutPage.css";

export class CartCheckoutPage extends Component {
  state = {
    charge: undefined
  }
  createCreditCardCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:80/checkout-credit-card',
        data: {
          email,
          name,
          amount,
          token
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resData = res.data
      this.setState({charge: resData})
    } catch (error) {
      console.log(error)
    }
  }

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
          createCreditCardCharge={this.createCreditCardCharge}
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
