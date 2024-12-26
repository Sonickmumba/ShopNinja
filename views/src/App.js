import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "./features/login/userSlice";
import signout from "./features/util/signout";
import HomePage from "./features/homePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./features/login/LoginPage";
import Signup from "./features/login/Signup";
import User from "./features/login/User";
import ProtectedRoute from "./features/util/ProtectedRoute";
import "./App.css";
import Footer from "./features/homePage/Footer";
import ProductDetails from "./features/homePage/products/ProductDetails";
import Cart from "./features/cart/Cart";
import Checkout from "./features/checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const { isSignedIn, userProfile } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [addToCartMessage, setAddToCartMessage] = useState("");

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signOut());
    signout();
  };

  const addToCart = (item) => {
    if (!item || !item.id || !item.quantity) {
      console.error("Invalid item passed to addToCart.");
      setAddToCartMessage("Failed to add item to cart.");
      return;
    }

    const foundIndex = cartItems.findIndex((ele) => ele.id === item.id);

    if (foundIndex === -1) {
      // Add new item to the cart
      setCartItems((prev) => [...prev, item]);
      setAddToCartMessage("Added successfully to cart");
    } else {
      setCartItems((prev) => {
        const updatedCart = [...prev];
        updatedCart[foundIndex].quantity += item.quantity;
        return updatedCart;
      });
      setAddToCartMessage("Updated quantity in cart");
    }

    // Clear message after 3 seconds
    setTimeout(() => setAddToCartMessage(""), 3000);
  };

  const handleRemoveBtn = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id, 10);

    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    // <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              message={addToCartMessage}
              setAddToCartMessage={setAddToCartMessage}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <User
              isSignedIn={isSignedIn}
              userProfile={userProfile}
              handleSignout={handleSignout}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cartItems={cartItems} handleRemoveBtn={handleRemoveBtn} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
    // </div>
  );
}

export default App;
