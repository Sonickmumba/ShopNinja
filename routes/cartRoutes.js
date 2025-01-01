const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Route to get all the carts

// router.get("/", cartController.getAllCarts);

// Route to get the cart for a user
router.get('/:user_id', cartController.getCart);

// Route to add an item to the cart
router.post('/add-item', cartController.addItem);

// Route to update item quantity in the cart
router.put('/update-item', cartController.updateItem);


// Route to remove an item from the cart
router.delete('/remove-item/:id', cartController.removeItem);

// Route to sync the cart (replace all cart items)
// router.put('/sync', cartController.syncCart);

// Route to clear the cart (remove all items)
router.delete('/clear/:id', cartController.clearCart);

module.exports = router;
