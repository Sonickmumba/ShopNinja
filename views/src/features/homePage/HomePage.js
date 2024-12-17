// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../util/Carousel";
// import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
// import checkAuthStatus from "../../utils/checkAuthStatus";
import { MdNotifications, MdSearch } from "react-icons/md";
// import Footer from "./Footer";
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
          <a href="#jkj">All</a>
          <a href="#gh">Women</a>
          <a href="#n">Men</a>
          <a href="#p">Sale</a>
          <a href="#bn">Electronics</a>
          <a href="#po">Sports</a>
          <a href="#gf">Books</a>
          <a href="#sd">Pets</a>
          <a href="#er">Household</a>
          <a href="#as">Kids</a>
          <a href="#ex">Industrial</a>
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

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product" />
              <h3>Product Name</h3>
              <p>$49.99</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>

          </div>
          
        </section>
      </main>
    </div>
  );
};

export default HomePage;
