const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

const db = require('../db/queries');

const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '123'
 *                   name:
 *                     type: string
 *                     example: 'John Doe'
 *                   email:
 *                     type: string
 *                     example: 'john.doe@example.com'
 */
router.get('/users', userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123'
 *                 name:
 *                   type: string
 *                   example: 'John Doe'
 *                 email:
 *                   type: string
 *                   example: 'john.doe@example.com'
 *       404:
 *         description: User not found
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'John Doe'
 *               email:
 *                 type: string
 *                 example: 'john.doe@example.com'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123'
 *                 name:
 *                   type: string
 *                   example: 'John Doe'
 *                 email:
 *                   type: string
 *                   example: 'john.doe@example.com'
 *       400:
 *         description: Invalid input
 */
router.post('/register', db.registerUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'John Doe Updated'
 *               email:
 *                 type: string
 *                 example: 'john.doe.updated@example.com'
 *               password:
 *                 type: string
 *                 example: 'newpassword123'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123'
 *                 name:
 *                   type: string
 *                   example: 'John Doe Updated'
 *                 email:
 *                   type: string
 *                   example: 'john.doe.updated@example.com'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', userController.deleteUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'john.doe'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       302:
 *         description: Redirects to /api/users on successful login
 *       401:
 *         description: Unauthorized
 */

// Authenticated user routes
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/api/login',
}), (req, res) => {
  // // Generate a JWT token
  // const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // res.json({ token }); // Return the token in the response
  res.redirect('/api/users'); // Add the appropriate route here for redirect to home page
});

/**
 * @swagger
 * //api/login:
 *   get:
 *     summary: Get login page
 *     responses:
 *       200:
 *         description: Returns the login page
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'Login page'
 */

router.get('/login', (req, res) => {
  res.send('Login page'); // Replace with actual HTML or a template if needed
});

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Logout user
 *     responses:
 *       302:
 *         description: Redirects to the home page after logout
 *       500:
 *         description: Logout failed
 */

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.redirect('/');
  });
});

module.exports = router;
