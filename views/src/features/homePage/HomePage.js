// import React, { useState, useEffect } from "react";
import { MdNotifications, MdSearch } from "react-icons/md";
import Carousel from "../util/Carousel";
import "./HomePage.css";
import Product from "./products/Product";

const HomePage = () => {
  // const products = [
  //   { id: 1, name: "Product 1", price: "$49.99", img: "url" },
  //   { id: 2, name: "Product 2", price: "$59.99", img: "url" },
  //   // Add more products here
  // ];

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
        <Product />
        {/* <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.img} alt="Product" />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default HomePage;
