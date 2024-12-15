import React, { useState } from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import HomePage from "./features/homePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import LoginPage from "./features/login/LoginPage";
import Signup from "./features/login/Signup";
import User from "./features/login/User";
// import ProtectedRoute from "./features/util/ProtectedRoute";
import "./App.css";
import Footer from "./features/homePage/Footer";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const navigate = useNavigate();

  const handleSignIn = () => {
    console.log("Sign in button clicked");
    // navigate('/login')
  };

  return (
    <div className="App">
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
            element={<User isSignedIn={isSignedIn} onSignIn={handleSignIn} />}
          />
        </Routes>
        <Footer />
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
