// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../util/Carousel";
// import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
// import checkAuthStatus from "../../utils/checkAuthStatus";
import { MdNotifications, MdSearch } from "react-icons/md";
import Footer from "./Footer";
import Carousel from "../util/Carousel";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header>
        <div className="header-container">
          <p className="shop-name">ShopNinja</p>
          <MdNotifications className="notification-icon" />
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="What are you looking for ?"
        />
        <button type="button" className="search-button">
          <MdSearch className="search-icon" />
        </button>
        <div className="categories">
          <a href="#">All</a>
          <a href="#">Women</a>
          <a href="#">Men</a>
          <a href="#">Sale</a>
          <a href="#">Electronics</a>
          <a href="#">Sports</a>
          <a href="#">Books</a>
          <a href="#">Pets</a>
          <a href="#">Household</a>
          <a href="#">Kids</a>
          <a href="#">Industrial</a>
        </div>
      </header>
      <main className="main-container">
        <Carousel />
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {/* Dynamically render product cards */}
            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
            {/* Repeat for other products */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
