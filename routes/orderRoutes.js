const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', orderController.getOrders);
router.get('/orders/:orderId', orderController.getOrderDetails);


module.exports= router;