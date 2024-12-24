import React, { useState } from "react";
import styles from "./Checkout.module.css";

const DeliveryAddress = ({ address}) => {
  const [showModal, setShowModal] = useState(false);
  const handleAddAddress = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveAddress = () => {
    // Implement the save the address logic (e.g., API call)
    setShowModal(false);
    alert("New address saved!");
  };

  return (
    <section className={styles.deliverySection}>
      <h3>Delivery Address</h3>
      <p className={styles.address}>{address}</p>
      <button className={styles.addAddressButton} onClick={handleAddAddress}>
        + Add address
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add a New Address</h3>
            <textarea
              className={styles.addressInput}
              placeholder="Enter new address"
            ></textarea>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={saveAddress}>
                Save
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeliveryAddress;
