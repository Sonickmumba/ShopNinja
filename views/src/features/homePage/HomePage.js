// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../util/Carousel";
// import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
// import checkAuthStatus from "../../utils/checkAuthStatus";
import { MdNotifications } from "react-icons/md";
import Footer from "./Footer";
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
      </header>
      
      <Footer />
      
    </div>
  );
};

export default HomePage;
