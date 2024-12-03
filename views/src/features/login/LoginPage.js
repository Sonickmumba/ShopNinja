import React, { useState } from "react";
// import Signup from "./Signup";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add your login logic here
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        setError("Wrong password or Email!!");
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Save token (optional)
      localStorage.setItem('token', data.token);

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google OAuth logic here
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Add Facebook OAuth logic here
  };

  const handleXLogin = () => {
    console.log("X login clicked");
    // Add Twitter/X OAuth logic here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Go to sign up');
    navigate('/signup')
  }

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="input-container">
          <label htmlFor="userEmail" className="label">
            Email
          </label>
          <input
            type="text"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="remember-forgot">
          <label htmlFor="remember" className="remember-me">
            <input type="checkbox" id="remember" />
            Remember me?
          </label>
          <a href="sonick" className="forgot-password">
            Forgot password
          </a>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p>{error}</p>}
      </form>

      <div className="social-container">
        <div className="login-option">
          <div className="line"></div>
          <div>Or login with:</div>
          <div className="line"></div>
        </div>
        <div className="login-go-fa-x">
          <button onClick={handleGoogleLogin} className="social-button google">
            <FcGoogle />
          </button>
          <button
            onClick={handleFacebookLogin}
            className="social-button facebook"
          >
            <FaFacebook />
          </button>
          <button onClick={handleXLogin} className="social-button x">
            <FaTwitter />
          </button>
        </div>
        <div className="sign-up-option">
          Don't have an account? <span onClick={handleSignup}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
