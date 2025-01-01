import React, { useState, useEffect } from "react";
import { MdNotifications, MdSearch } from "react-icons/md";
import Carousel from "../util/Carousel";
import "./HomePage.css";
import Product from "./products/Product";

const HomePage = ( { addToCart }) => {
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState('');

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toLowerCase());

    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchQuery));
    setFilteredProducts(filtered);
  }

  const displayedProducts = searchQuery ? filteredProducts : products;


  useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch("http://localhost:3001/api/products/");
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }, []);

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
          onChange={handleSearchQuery}
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
        <Product displayedProducts={displayedProducts} addToCart={addToCart}/>
      </main>
    </div>
  );
};

export default HomePage;
