const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.createCart);
router.post('/:cartId', cartController.addToCart);
router.get('/:id', cartController.getCart);


module.exports = router;