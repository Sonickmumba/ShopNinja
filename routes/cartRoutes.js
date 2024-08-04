const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new shopping cart for a user.
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
 * /api/cart/{cartId}:
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
 *       - in: body
 *         name: item
 *         description: The item details to be added to the cart
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: integer
 *               example: 101
 *             quantity:
 *               type: integer
 *               example: 2
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
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart details
 *     description: Retrieve the details of a specific cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart to retrieve
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully
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
 *                       productId:
 *                         type: integer
 *                         example: 101
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                 totalPrice:
 *                   type: number
 *                   example: 199.98
 *       404:
 *         description: Cart not found
 */
router.get('/:id', cartController.getCart);


module.exports = router;