import React, { Component } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import uuid from "uuid";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

import ProductPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import MainNavBar from "./pages/MainNavBar";
import CartPage from "./pages/CartPage";
import Message from "./pages/Message";

library.add(faShoppingCart);

const products = [
  {
    id: uuid(),
    title: "Rooibos tea",
    price: 20000
  },
  {
    id: uuid(),
    title: "Green tea",
    price: 29000
  },
  {
    id: uuid(),
    title: "Black tea",
    price: 25000
  }
];

class App extends Component {
  state = {
    products,
    cart: {
      email: "guest@test.com",
      name: "Guest",
      items: [],
      amount: 0,
      totalQty: 0
    },
    addToCartMessage: undefined
  };

  addToCart = id => () => {
    const { products, cart } = this.state;
    const newCart = { ...cart };

    // Find selected product from all products
    const selectedProduct = products.find(product => product.id === id);
    if (!selectedProduct) {
      return;
    }

    // Check if the selected product is already in cart
    const checkIndexInCart = cart.items.findIndex(
      product => product.id === selectedProduct.id
    );

    if (checkIndexInCart >= 0) {
      // The selected product is already in the cart --> increase quantity
      newCart.items[checkIndexInCart].quantity++;
      //this.setState({cart: newCart})
    } else {
      // The selected product is not in the cart yet --> add new item to cart.items
      newCart.items.push({ ...selectedProduct, quantity: 1 });
      //this.setState({cart: newCart})
    }

    // Update amount
    newCart.amount += selectedProduct.price;
    newCart.totalQty += 1
    this.setState({
      cart: newCart,
      addToCartMessage: selectedProduct.title
    });

    this.clearAddToCartMessage()
  };

  clearAddToCartMessage = () => {
    setTimeout(() => {
      this.setState({addToCartMessage: undefined})
    }, 1000);
  }

  deleteItemFromCart = id => () => {
    const { cart } = this.state;
    const newCart = { ...cart };

    // Find the deleted item
    const deletedItem = cart.items.find(item => item.id === id);

    if (!deletedItem) return;

    // Filter out the deleted item from new cart
    newCart.items = cart.items.filter(item => item.id !== id);

    // Update amount
    newCart.amount -= deletedItem.quantity * deletedItem.price;
    newCart.totalQty -= deletedItem.quantity

    this.setState({ cart: newCart });
  };

  increaseCartItemQty = id => () => {
    const { cart } = this.state;
    const newCart = { ...cart };

    // Find an index of the increased item in cart
    const index = cart.items.findIndex(item => item.id === id);

    if (index < 0) return;

    // Update quantity an amount
    newCart.items[index].quantity++;
    newCart.amount += newCart.items[index].price;
    newCart.totalQty += 1

    this.setState({ cart: newCart });
  };

  decreaseCartItemQty = id => () => {
    const { cart } = this.state;
    const newCart = { ...cart };

    // Find an index of the increased item in cart
    const index = cart.items.findIndex(item => item.id === id);

    if (index < 0) return;

    if (newCart.items[index].quantity === 1) {
      // Update quantity and amount and remove it from cart
      newCart.items[index].quantity--;
      newCart.amount -= newCart.items[index].price;
      newCart.totalQty -= 1
      newCart.items.splice(index, 1);

      this.setState({ cart: newCart });
    } else {
      // Update quantity an amount
      newCart.items[index].quantity--;
      newCart.amount -= newCart.items[index].price;
      newCart.totalQty -= 1

      this.setState({ cart: newCart });
    }
  };

  clearCart = () => {
    this.setState({
      cart: {
        name: "Guest",
        items: [],
        amount: 0,
        totalQty: 0
      }
    });
  };

  render() {
    const { products, cart, addToCartMessage } = this.state;

    return (
      <BrowserRouter >
        <React.Fragment>
          <MainNavBar qty={cart.totalQty}/>
          <main className="App">
            <Switch>
              <Redirect from="/" to="/products" exact />
              <Route
                path="/products"
                render={props => (
                  <ProductPage
                    {...props}
                    products={products}
                    addToCart={this.addToCart}
                    message={addToCartMessage}
                  />
                )}
              />
              <Route
                path="/cart"
                render={props => (
                  <CartPage
                    {...props}
                    cart={cart}
                    // goToCheckoutPage={this.goToCheckoutPage}
                    // goToProductPage={this.goToProductPage}
                    deleteItemFromCart={this.deleteItemFromCart}
                    increaseCartItemQty={this.increaseCartItemQty}
                    decreaseCartItemQty={this.decreaseCartItemQty}
                  />
                )}
              />
              <Route
                path="/checkout"
                render={props => (
                  <CheckoutPage
                    {...props}
                    cart={cart}
                    clearCart={this.clearCart}
                  />
                )}
              />
              <Route path="/message" component={Message} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
