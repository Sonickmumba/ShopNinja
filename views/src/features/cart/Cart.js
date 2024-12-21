import React from "react";
// import { FiChevronLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

// const Cart = ({ cartItems }) => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className={styles.cartMainContainer}>
//       <div>
//         <FiChevronLeft size={40} onClick={handleBack} />
//       </div>
//       {cartItems &&
//         cartItems.map((item) => (
//           <div className={styles.cartCard} key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.quantity}</p>
//           </div>
//         ))}
//     </div>
//   );
// };

const Cart = ({ cartItems, handleRemoveBtn }) => {
  //   const navigate = useNavigate();

  //   const handleBack = () => {
  //     navigate(-1);
  //   };
  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.header}>My cart</h2>

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
              <p>Price: R{parseInt(item.price) * item.quantity}</p>
            </div>
            <button className={styles.removeButton} id={item.id} onClick={(e)=> handleRemoveBtn(e)}>×</button>
          </div>
        ))}

      <div className={styles.cartItem}>
        <img
          className={styles.itemImage}
          src="path/to/lehenga.jpg"
          alt="Semi-Stitched Lehenga Choli"
        />
        <div className={styles.itemDetails}>
          <h3 className={styles.itemName}>
            Semi-Stitched Lehenga Choli With Dupatta
          </h3>
          <p className={styles.itemBrand}>Inari</p>
          <p>Size: S</p>
          <p>Rental: ₹2,399</p>
          <p>Rental duration: 3 days</p>
        </div>
        <button className={styles.removeButton}>×</button>
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
          <span>₹5,099.00</span>
        </div>
        <div className={styles.priceRow}>
          <span>Shipping</span>
          <span>₹70.00</span>
        </div>
        <div className={styles.priceRow}>
          <span>Tax</span>
          <span>₹30.00</span>
        </div>
        <div className={styles.priceRow}>
          <span>Coupon applied</span>
          <span>-₹100.00</span>
        </div>
        <div className={`${styles.priceRow} ${styles.total}`}>
          <span>Total</span>
          <span>₹5,199.00</span>
        </div>
      </div>

      <button className={styles.paymentButton}>Proceed to payment</button>
    </div>
  );
};

export default Cart;
