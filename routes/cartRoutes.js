const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new shopping cart for a user.
 *     requestBody:
 *       description: JSON object containing user ID to create a cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: 'Cart created successfully'
 *       400:
 *         description: Bad request
 */
router.post('/', cartController.createCart);

/**
 * @swagger
 * /cart/{cartId}:
 *   post:
 *     summary: Add item to cart
 *     description: Add a specific item to an existing cart.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart to which the item will be added
 *     requestBody:
 *       description: JSON object containing product ID, quantity, and price to add to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               price:
 *                 type: number
 *                 example: 19.99
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartId:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: 'Item added to cart'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Cart not found
 */

router.post('/:cartId', cartController.addToCart);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get cart contents
 *     description: Retrieve the contents of a specific cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart to retrieve
 *     responses:
 *       200:
 *         description: Cart contents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         example: 2
 *                       quantity:
 *                         type: integer
 *                         example: 3
 *                       price:
 *                         type: number
 *                         example: 19.99
 *                 total_price:
 *                   type: number
 *                   example: 59.97
 *       404:
 *         description: Cart not found
 */
router.get('/:id', cartController.getCart);


module.exports = router;