import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import HomePage from "./features/homePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./features/login/LoginPage";
import Signup from "./features/login/Signup";
import ProtectedRoute from "./features/util/ProtectedRoute";
import "./App.css";

function App() {
  return (
    // <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
