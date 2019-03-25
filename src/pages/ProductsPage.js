import React from "react";
import { Link } from "react-router-dom";

import "./ProductsPage.css";

const ProductsPage = ({ products, addToCart, message }) => {
  return (
    <React.Fragment>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product__item">
            <h4>{product.title}</h4>
            <h4>{new Intl.NumberFormat().format(product.price / 100)} Baht</h4>
            <button className="btn" onClick={addToCart(product.id)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart_message">
        {message && (
            <h4>
              <span className="cart_message__title">{message}</span> was added
              to cart
            </h4>
        )}
      </div>

      <Link to={"/cart"} className="product btn">
        Go to Cart
      </Link>
    </React.Fragment>
  );
};

export default ProductsPage;
