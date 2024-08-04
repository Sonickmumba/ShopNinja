const express = require('express');
const passport = require('passport');

const orderController = require('../controllers/orderController');

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     description: Retrieve a list of orders. Requires authentication.
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
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
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   total_amount:
 *                     type: number
 *                     example: 99.99
 *                   status:
 *                     type: string
 *                     example: 'Shipped'
 *       401:
 *         description: Unauthorized, authentication required
 */

router.get('/', passport.authenticate('local', { session: true }), orderController.getOrders);

// router.get('/', (req, res, next) => {
//   console.log('Request headers:', req.headers);
//   console.log('Request query:', req.query);
//   next();
// }, orderController.getOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Retrieve details of a specific order by its ID. Requires authentication.
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Details of a specific order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 total_amount:
 *                   type: number
 *                   example: 99.99
 *                 status:
 *                   type: string
 *                   example: 'Shipped'
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         example: 49.99
 *       401:
 *         description: Unauthorized, authentication required
 *       404:
 *         description: Order not found
 */

router.get('/:orderId', passport.authenticate('local', { session: true }), orderController.getOrderDetails);


module.exports= router;