// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../util/Carousel";
// import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
// import checkAuthStatus from "../../utils/checkAuthStatus";
import Footer from "./Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header>ShopNinja</header>
      <div className="search-feature-container">
        <input
          type="text"
          className="search-bar"
          placeholder="What are you looking for ?"
        />
         <Footer />
      </div>
      {/* <Footer /> */}

    </div>
  );
};

export default HomePage;
