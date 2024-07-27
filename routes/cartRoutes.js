const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', cartController.createCart);
router.post('/cart/:cartId', cartController.addToCart);
router.get('/cart/:id', cartController.getCart);


module.exports = router;