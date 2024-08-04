const express = require('express');
const checkoutController = require('../controllers/checkOutController');

const router = express.Router();

/**
 * @swagger
 * /api/cart/{cartId}/checkout:
 *   post:
 *     summary: Checkout a cart
 *     description: Complete the purchase for the specified cart, processing the payment and generating an order.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cart to checkout
 *     requestBody:
 *       description: JSON object containing payment details and any additional information needed to complete the purchase
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_method:
 *                 type: string
 *                 example: 'credit_card'
 *               billing_address:
 *                 type: string
 *                 example: '123 Main St, Springfield, IL'
 *               shipping_address:
 *                 type: string
 *                 example: '456 Elm St, Springfield, IL'
 *     responses:
 *       200:
 *         description: Checkout completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 12345
 *                 message:
 *                   type: string
 *                   example: 'Checkout successful. Your order has been placed.'
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

router.post('/:cartId/checkout', checkoutController.checkout);

module.exports = router;