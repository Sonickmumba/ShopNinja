const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.createCart);
router.post('/:cartId', cartController.addToCart);
router.get('/:id', cartController.getCart);
// router.post('/cart/:cartId/checkout', cartController.checkout);


module.exports = router;