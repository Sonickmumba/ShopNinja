import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/api/products/");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products && products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="product-card" >
                <img src={product.image_url} alt="Product" />
                <h3>{product.name}</h3>
                <p>R{product.price}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
