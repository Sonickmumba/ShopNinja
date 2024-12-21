import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.cartMainContainer}>
      <div>
        <FiChevronLeft size={40} onClick={handleBack} />
      </div>
      {cartItems &&
        cartItems.map((item) => (
          <div className={styles.cartCard} key={item.id}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
    </div>
  );
};

export default Cart;
