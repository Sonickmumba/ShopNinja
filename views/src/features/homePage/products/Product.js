// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = ({ displayedProducts, addToCart }) => {

  const handleAddToCartBtn = (product) => {
    console.log("Adding product to cart:", product);
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return;
    }
    if (addToCart) {
      addToCart(product);
    } else {
      console.error("addToCart function is not defined.");
    }
  };
  
  return (
    <div>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {displayedProducts &&
            displayedProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image_url} alt="Product" />
                </Link>
                <h3>{product.name}</h3>
                <p>R{product.price}</p>
                <button className="add-to-cart-button" onClick={()=>handleAddToCartBtn(product)}>Add to Cart</button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
