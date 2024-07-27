const express = require('express');
const passport = require('passport');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', passport.authenticate('local', { session: true }), orderController.getOrders);
router.get('/:orderId', passport.authenticate('local', { session: true }), orderController.getOrderDetails);


module.exports= router;