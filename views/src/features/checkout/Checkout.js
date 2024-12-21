import React from 'react';
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
//   return (
//     <div>Checkout</div>
//   )

return (
    <div className={styles.paymentContainer}>
      {/* Header */}
      <header className={styles.paymentHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h2>Payment</h2>
        <button className={styles.favoritesButton}>♡</button>
      </header>

      {/* Delivery Address */}
      <section className={styles.deliverySection}>
        <h3>Delivery Address</h3>
        <p className={styles.address}>Jubilee Garden, Bandan Gali, Gujarat</p>
        <button className={styles.addAddressButton}>Add address</button>
      </section>

      {/* Payment Methods */}
      <section className={styles.paymentMethods}>
        <h3>Payment method</h3>
        <ul>
          <li>UPI Methods</li>
          <li>Credit card/ Debit card</li>
          <li>Net Banking</li>
          <li>Cash on delivery</li>
        </ul>
      </section>

      {/* Saved Payment Options */}
      <section className={styles.savedOptions}>
        <h3>Saved payment option</h3>
        <div className={styles.savedOption}>
          <input type="radio" name="payment" id="saved-card" />
          <label htmlFor="saved-card" className={styles.savedCardLabel}>
            Citi Credit card <span className={styles.visa}>VISA</span>
            <span className={styles.cardNumber}>****7689</span>
            <span className={styles.cardName}>John Albert</span>
          </label>
        </div>
      </section>

      {/* Bank Offers */}
      <section className={styles.bankOffers}>
        <h3>Bank offers</h3>
        <p>5% Unlimited cashback on Citi bank credit card. TCA</p>
        <button className={styles.showMore}>Show more</button>
      </section>

      {/* Pay Button */}
      <div className={styles.payFooter}>
        <button className={styles.payButton}>Pay ₹5,199</button>
      </div>
    </div>
  );
}

export default Checkout