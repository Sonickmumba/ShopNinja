import React, { useState } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import HomePage from './features/homePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import './App.css';

function App() {
  const [signup, setSignup] = useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    setSignup(true);
  }

  return (
    // <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ !signup ? <LoginPage handleSignup={handleSignup}/> : <HomePage />} />
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
