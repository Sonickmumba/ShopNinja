// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../util/Carousel";
// import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
// import checkAuthStatus from "../../utils/checkAuthStatus";
import "./HomePage.css";

const HomePage = () => {

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="logo">ShopNinja</div>
        <ul className="navigation">
          <li>
            <a href="#login">Login</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#register">Register</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#orders">Orders</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#account">My Account</a>
          </li>
          <div className="navbar-icons">
            {/* <FiShoppingCart /> */}
            {/* <FiUser /> */}
          </div>
        </ul>
      </nav>
      <div className="search-feature-container">
        <input
          type="text"
          className="search-bar"
          placeholder="What are you looking for ?"
          // value={searchTerm}
          // onChange={handleSearch}
        />
      </div>
      <footer><ul className="navigation">
          <li>
            <a href="#login">Login</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#register">Register</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#orders">Orders</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#account">My Account</a>
          </li>
          <div className="navbar-icons">
            {/* <FiShoppingCart /> */}
            {/* <FiUser /> */}
          </div>
        </ul></footer>
    </div>
  );
};

export default HomePage;
