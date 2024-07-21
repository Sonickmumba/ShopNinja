const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Authenticated user routes
router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/users',
  failureRedirect: '/api/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
