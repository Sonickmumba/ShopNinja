import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";

const DeliveryAddress = ({ address }) => {
  const { isSignedIn, userProfile } = useSelector((state) => state.user);
  console.log(isSignedIn);

  const [formData, setFormData] = useState({
    address_line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      { ...prev, [name]: value }
    ))
  }
  
  const handleAddAddress = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const saveAddress = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field)) {
      alert("All fields are required!");
      return;
    }

    if (!isSignedIn) {
      alert("You are not signed in")
      return;
    }

    const userId = userProfile.id;

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // Replace with the actual user ID
          ...formData
        }),
      });

      if (response.status === 409) {
        // const response = await fetch(`http://localhost:3001/api/user/address/${userId}`, {method: "GET", headers: {"Content-Type": "application/json"}});
        // console.log(response)
        alert("Address already exists. Please enter a new address.");
        return;
      }
      
  
      if (!response.ok) {
        throw new Error("Failed to save address");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      // Close the modal and reset the form
      closeModal();
      setFormData({ address_line1: "", city: "", state: "", postalCode: "", country: "" });
      // setAddress_line1('');
      // setCity('');
      // setState('');
      // setPostalCode('');
      // setCountry('');
      alert("New address saved!");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.deliverySection}>
      <h3>Delivery Address</h3>
      <p className={styles.address}>{address}</p>
      <button className={styles.addAddressButton} onClick={handleAddAddress}>
        + Add address
      </button>

      {/* {showModal && (
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
      )} */}

      {/* {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add a New Address</h3>
            <form onSubmit={saveAddress}>
              <div className={styles.formGroup}>
                <label htmlFor="address">Address Line 1</label>
                <input
                  type="text"
                  id="address"
                  className={styles.input}
                  placeholder="Enter address line 1"
                  value={address_line1}
                  onChange={(e) => setAddress_line1(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className={styles.input}
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  className={styles.input}
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  className={styles.input}
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  className={styles.input}
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}



      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 id="modal-title">Add a New Address</h3>
            <form onSubmit={saveAddress}>
              {["address_line1", "city", "state", "postalCode", "country"].map((field) => (
                <div className={styles.formGroup} key={field}>
                  <label htmlFor={field}>{field.replace(/_/g, " ")}</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    className={styles.input}
                    placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeliveryAddress;
