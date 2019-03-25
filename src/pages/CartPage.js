import React from "react";
import {Link} from 'react-router-dom'

import "./CartPage.css";

const CartPage = ({
  cart,
  deleteItemFromCart,
  increaseCartItemQty,
  decreaseCartItemQty
}) => {
  return (
    <div className="cart">
      {cart.items.length === 0 && <p>Nothing in cart</p>}
      {cart.items &&
        cart.items.map(item => (
          <div key={item.id} className="cart__item">
            <h4>{item.title}</h4>
            <h4>Price: {new Intl.NumberFormat().format(item.price / 100)} Baht</h4>
            <h4>
              Qty: {item.quantity} pcs{" "}
              <button className="minus" onClick={decreaseCartItemQty(item.id)}>
                -
              </button>{" "}
              <button className="plus" onClick={increaseCartItemQty(item.id)}>
                +
              </button>
            </h4>
            <h4>Amount: {new Intl.NumberFormat().format((item.quantity * item.price) / 100)} Baht</h4>
            <button className="btn" onClick={deleteItemFromCart(item.id)}>
              Delete
            </button>
          </div>
        ))}
      {cart.amount > 0 && (
        <div className="cart__total">
          <h2>Total amount: {new Intl.NumberFormat().format(cart.amount / 100)} Baht</h2>
        </div>
      )}

      <Link to={"/products"} className="product btn">Continue Shopping</Link>

      {cart.amount > 0 && (
        <Link to={"/checkout"} className="checkout btn">Process to Checkout</Link>
      )}
    </div>
  );
};

export default CartPage;
