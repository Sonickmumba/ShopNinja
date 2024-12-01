import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strong password regex
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/
;

    if (!strongPasswordRegex.test(formData.password)) {
      setMessage(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formData
      );
      setMessage(response.data.message);
      console.log(response);

      if (response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <input
            type="name"
            name="name"
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Signup
        </button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Already have an account?{" "}
        <Link to="/">Sign in here</Link>
      </p>
    </div>
  );
}

export default Signup;
