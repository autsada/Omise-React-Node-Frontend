import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainNavBar.css';

const MainNavBar = ({qty}) => {
  return (
    <header className="main-nav">
      <div className="main-nav__logo">
        <h1>
          <Link to="/products">Sabai Shop</Link>
        </h1>
      </div>
      <div  className="main-nav__right-container">
        <nav className="main-nav__items">
          <ul>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/checkout">Checkout</NavLink>
            </li>
          </ul>
        </nav>
        <div className="cart-icon">
          <div className="cart-icon__count">{qty}</div>
          <FontAwesomeIcon
            icon={'shopping-cart'}
            color={'#fff'}
          />
        </div>
      </div>
    </header>
  );
};

export default MainNavBar;
