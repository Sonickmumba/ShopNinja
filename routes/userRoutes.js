const express = require("express");
const { body, validationResult } = require("express-validator");
const jwtMiddleware = require("../utils/jwtMiddleware");
const userController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const db = require("../db/queries");

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
router.get("/users", userController.getUsers);

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
router.get("/users/:id", userController.getUserById);

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
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  db.registerUser
);

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
router.put("/users/:id", userController.updateUser);

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
router.delete("/users/:id", userController.deleteUser);

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
router.post(
  "/login",
  // passport.authenticate("local", {
  //   failureRedirect: "/api/login",
  // }),
  // async (req, res) => {
  //   // // Generate a JWT token
  //   // const token = jwtMiddleware.generateToken(req.user);

  //   // // Optionally set the token in an HTTP-only cookie
  //   // res.cookie("token", token, {
  //   //   httpOnly: true,
  //   //   secure: process.env.NODE_ENV === "production",
  //   //   sameSite: "Strict",
  //   //   maxAge: 3600000,
  //   // });

  //   // // res.json({ token, id: req.user.id }); // Return the token in the response
  //   // res.json({ message: "Login successful", token, user: req.user });

  //   // alternative
  //   try {
  //     const token = jwtMiddleware.generateToken(req.user);
  //     res.cookie("token", token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "Strict",
  //       maxAge: 3600000, // 1 hour
  //     });
  //     res.json({ message: "Login successful", user: req.user });
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || "Invalid email or password" });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        // Generate JWT token
        const token = jwtMiddleware.generateToken(user);

        // Optionally set the token as an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 3600000, // 1 hour
        });

        // Send response with token and user details
        res.json({ message: "Login successful", token, user });
      });
    })(req, res, next);
  }
);

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

// router.get('/login', (req, res) => {
//   res.send('Login pageeee');
// });

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

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.redirect("/");
  });
});

module.exports = router;
