import React, { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginPage.css"; // Import the CSS file

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { userEmail, password });
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google OAuth logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Add Facebook OAuth logic here
  };

  const handleXLogin = () => {
    console.log("X login clicked");
    // Add Twitter/X OAuth logic here
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="input-container">
          <label htmlFor="username" className="label">
            Email
          </label>
          <input
            type="text"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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

        <div class="remember-forgot">
          <label class="remember-me">
            <input type="checkbox" />
            Remember me?
          </label>
          <a href="sonick" class="forgot-password">
            Forgot password
          </a>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="social-container">
        <div className="login-option">
          <div className="line"></div>
          <div>Or login with:</div>
          <div className="line"></div>
        </div>
        {/* <p className="social-text">Or login with:</p> */}
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
          Don't have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
