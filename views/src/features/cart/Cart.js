import React, { useState, useEffect } from "react";
// import { FiChevronLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = ({ cartItems, handleRemoveBtn }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(250); // Fixed shipping cost
  const [tax, setTax] = useState(30); // Fixed tax
  const [couponDiscount, setCouponDiscount] = useState(100); // Fixed coupon discount
  const [total, setTotal] = useState(0);

  // Calculate Subtotal and Total Whenever Cart Updates
  useEffect(() => {
    const calculatedSubTotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    setSubTotal(calculatedSubTotal);

    const calculatedTotal =
      calculatedSubTotal + shipping + tax - couponDiscount;
    setTotal(calculatedTotal);
  }, [cartItems, shipping, tax, couponDiscount]);
  //   const navigate = useNavigate();

  //   const handleBack = () => {
  //     navigate(-1);
  //   };
  //   const totalAmount =
  //     cartItems &&
  //     cartItems.reduce(
  //       (amount, item) => amount + Number(item.price) * item.quantity,
  //       0
  //     );

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.header}>My cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCartMessage}>
          <p>Your cart is empty.</p>
          <button
            className={styles.shopButton}
            onClick={() => {
              // Navigate to the shopping page (implement navigation logic here)
              console.log("Redirecting to shop...");
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className={styles.cartCardContainer}>
            {cartItems &&
              cartItems.map((item) => (
                <div className={styles.cartItem} key={item.id}>
                  <img
                    className={styles.itemImage}
                    src={item.image_url}
                    alt="Classic Vest"
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemBrand}>{item.description}</p>
                    <p>quantity: {item.quantity}</p>
                    <p>Price: R{Number(item.price) * item.quantity}</p>
                  </div>
                  <button
                    className={styles.removeButton}
                    id={item.id}
                    onClick={(e) => handleRemoveBtn(e)}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>

          <div className={styles.couponSection}>
            <input
              type="text"
              placeholder="Apply coupon"
              className={styles.couponInput}
            />
            <button className={styles.couponButton}>+</button>
          </div>

          <div className={styles.priceDetails}>
            <div className={styles.priceRow}>
              <span>Sub total</span>
              <span>R {subTotal.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span>R {shipping.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Tax</span>
              <span>R {tax.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Coupon applied</span>
              <span>-R {couponDiscount.toFixed(2)}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.total}`}>
              <span>Total</span>
              <span>R {total.toFixed(2)}</span>
            </div>
            <button className={styles.paymentButton}>Proceed to payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
