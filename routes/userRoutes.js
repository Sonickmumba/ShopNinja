const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Authenticated user routes
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/api/login',
}), (req, res) => {
  res.redirect('/api/users'); // Add the appropriate route here for redirect
});

router.get('/login', (req, res) => {
  res.send('Login page'); // Replace with actual HTML or a template if needed
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.redirect('/');
  });
});

module.exports = router;
