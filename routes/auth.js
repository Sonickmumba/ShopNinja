const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', // Redirect to login if authentication fails
  }),
  (req, res) => {
    // Successful authentication, redirect to the homepage
    res.redirect('http://localhost:3000/home');
  }
);

module.exports = router;
