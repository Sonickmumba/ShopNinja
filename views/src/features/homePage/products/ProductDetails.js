import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import "./ProductDetails.css";

const ProductDetails = ( {addToCart, message, setAddToCartMessage}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) {
      toast.error("Product details are missing!");
      return;
    }
  
    if (quantity <= 0) {
      toast.error("Invalid quantity. Must be greater than 0.");
      return;
    }
  
    try {
      const itemToAdd = {
        id: product.id,
        quantity,
        price: product.price,
        name: product.name,
        description: product.description,
        image_url: product.image_url,
      };
  
      addToCart(itemToAdd);
    } catch (error) {
      return new Error('Not added')
    }
  };


  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="skeleton-loader">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-left-review-div">
        <FiChevronLeft size={40} onClick={handleBack} className="back-button" />
        <AiOutlineMessage size={40}/>
      </div>
      {/* <FiChevronLeft size={40} onClick={handleBack} className="back-button" /> */}
      <div className="product-details">
        <div className="image-container">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <div className="product-name-price">
            <h1>{product.name}</h1>
            <p className="product-price">R{product.price}</p>
          </div>
          <p className="product-description">{product.description}</p>
          <p className="product-review">2 Reviews</p>
          <div className="quantity-selector">
            <button className="quantity-button" onClick={handleDecrement}>
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-button" onClick={handleIncrement}>
              +
            </button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
