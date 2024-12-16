import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import HomePage from "./features/homePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./features/login/LoginPage";
import Signup from "./features/login/Signup";
import User from "./features/login/User";
// import ProtectedRoute from "./features/util/ProtectedRoute";
import "./App.css";
import Footer from "./features/homePage/Footer";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkSignedIn = async () => {
    try {
      const response = await fetch("http://localhost:3001/status", {
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
  
      const data = await response.json();
      console.log(data)
      if (data.message === "Authenticated") {
        setIsSignedIn(true); // User is authenticated
      } else {
        setIsSignedIn(false); // Not authenticated
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error);
      setIsSignedIn(false); // Default to not signed in on error
    }
  };
  

  console.log(isSignedIn);

  const handleSignIn = (navigate) => {
    console.log("Sign in button clicked");
    navigate('/login')
    // checkSignedIn();
  };

  useEffect(() => {
    checkSignedIn();
  }, []);

  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        /> */}
          <Route
            path="/user"
            element={<User isSignedIn={isSignedIn} onSignIn={(navigate) => handleSignIn(navigate)} />}
          />
        </Routes>
        <Footer />
      </Router>
    // </div>
  );
}

export default App;
