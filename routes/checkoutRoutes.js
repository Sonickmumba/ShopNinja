const express = require('express');
const checkoutController = require('../controllers/checkOutController');

const router = express.Router();

router.post('/:cartId/checkout', checkoutController.checkout);

module.exports = router;