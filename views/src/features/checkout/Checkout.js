import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import DeliveryAddress from "./DeliveryAddress";

const Checkout = () => {
  const [address, setAddress] = useState('');
  const { isSignedIn, userProfile } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const id = isSignedIn ? userProfile.id : null;

  const fetchUserAddress = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/address/${id}`);

      if (!response.ok){
        throw new Error("User address not found");
      }

      const data = await response.json();

      const userAddress = `${data.address_line1}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
      console.log(userAddress)
      setAddress(userAddress)
      console.log(response)
    } catch (error) {
      console.error("Error fetching user address:", error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchUserAddress();
    }
  }, [isSignedIn]);

  return (
    <div className={styles.paymentContainer}>
      {/* Header */}
      <header className={styles.paymentHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h2>Payment</h2>
        <button className={styles.favoritesButton}>♡</button>
      </header>

      {/* Delivery Address */}
      <DeliveryAddress address={address} />

      {/* Payment Methods */}
      <section className={styles.paymentMethods}>
        <h3>Payment method</h3>
        <ul>
          <li>
            <FiChevronRight /> UPI Methods
          </li>
          <li>
            <FiChevronRight /> Credit card/ Debit card
          </li>
          <li>
            <FiChevronRight /> Net Banking
          </li>
          <li>
            <FiChevronRight /> Cash on delivery
          </li>
        </ul>
      </section>

      {/* Saved Payment Options */}
      <section className={styles.savedOptions}>
        <h3>Saved payment option</h3>
        <div className={styles.savedOption}>
          <input type="radio" name="payment" id="saved-card" />
          <label htmlFor="saved-card" className={styles.savedCardLabel}>
            FNB Credit card <span className={styles.visa}>VISA</span>
            <span className={styles.cardNumber}>****7689</span>
            <span className={styles.cardName}>John Albert</span>
          </label>
        </div>
      </section>

      {/* Bank Offers */}
      <section className={styles.bankOffers}>
        <h3>Bank offers</h3>
        <p>5% Unlimited cashback on FNB bank credit card. TCA</p>
        <button className={styles.showMore}>Show more</button>
      </section>

      {/* Pay Button */}
      <div className={styles.payFooter}>
        <button className={styles.payButton}>Pay R 5,199</button>
      </div>
    </div>
  );
};

export default Checkout;
