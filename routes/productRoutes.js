const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Route to create a new product
router.post('/', productController.createProduct);

// Route to get products with optional filters
router.get('/', productController.getProducts);

// Route to get a single product by ID
router.get('/:id', productController.getProductById);

// Route to update a product
router.put('/:id', productController.updateProduct);

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
