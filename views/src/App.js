import React, { useState } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import HomePage from './features/homePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import Signup from './features/login/Signup';
import './App.css';

function App() {

  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
