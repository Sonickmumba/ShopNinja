const express = require('express');
const cartegoryController = require('../controllers/cartegoryController');
const router = express.Router();

// router.get('/', cartegoryController.getCartegories);
// router.post('/', cartegoryController.createCartegory)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 'Electronics'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category.
 *     requestBody:
 *       description: Category details to create a new category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Electronics'
 *               description:
 *                 type: string
 *                 example: 'This is electronics category'
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: 'Electronics'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid input, name is required'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */

// Route Definitions
router.get('/', cartegoryController.getCartegories);
router.post('/', cartegoryController.createCartegory);


module.exports = router;