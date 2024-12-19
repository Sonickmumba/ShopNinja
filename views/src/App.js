import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "./features/login/userSlice";
import signout from "./features/util/signout";
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
import ProductDetails from "./features/homePage/products/ProductDetails";

function App() {
  const dispatch = useDispatch();
  const { isSignedIn, userProfile } = useSelector((state) => state.user);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/status", {
        credentials: "include",
      });

      const data = await response.json();

      if (data?.user) {
        dispatch(signIn(data.user))
      } else {
        dispatch(signOut())
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error);
    }
  };

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signOut())
    signout();
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    // <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />}/>
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
          element={<User isSignedIn={isSignedIn} userProfile={userProfile} handleSignout={handleSignout}/>}
        />
      </Routes>
      <Footer fetchUserProfile={fetchUserProfile}/>
    </Router>
    // </div>
  );
}

export default App;
