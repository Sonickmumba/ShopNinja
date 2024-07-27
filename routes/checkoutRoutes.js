const express = require('express');
const checkoutController = require('../controllers/checkOutController');

const router = express.Router();

router.post('/cart/:cartId/checkout', checkoutController.checkout);

module.exports = router;