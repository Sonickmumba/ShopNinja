const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the inventory.
 *     requestBody:
 *       description: Product details to create a new product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Laptop'
 *               description:
 *                 type: string
 *                 example: 'Apple macbook pro'
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: 'Electronics'
 *             required:
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '605c72ef1c4f1f001f647fbd'
 *                 name:
 *                   type: string
 *                   example: 'Laptop'
 *                 price:
 *                   type: number
 *                   example: 999.99
 *                 category:
 *                   type: string
 *                   example: 'Electronics'
 *       400:
 *         description: Bad request
 */

// Route to create a new product
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     description: Retrieve a list of products with optional filters.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter products with a minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter products with a maximum price
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '605c72ef1c4f1f001f647fbd'
 *                   name:
 *                     type: string
 *                     example: 'Laptop'
 *                   price:
 *                     type: number
 *                     example: 999.99
 *                   category:
 *                     type: string
 *                     example: 'Electronics'
 *       400:
 *         description: Bad request
 */

// Route to get products with optional filters
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '605c72ef1c4f1f001f647fbd'
 *                 name:
 *                   type: string
 *                   example: 'Laptop'
 *                 price:
 *                   type: number
 *                   example: 999.99
 *                 category:
 *                   type: string
 *                   example: 'Electronics'
 *       404:
 *         description: Product not found
 */
// Route to get a single product by ID
router.get('/:id', productController.getProductById);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Modify the details of an existing product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       description: Updated product details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Updated Laptop'
 *               price:
 *                 type: number
 *                 example: 899.99
 *               category:
 *                 type: string
 *                 example: 'Electronics'
 *             required:
 *               - name
 *               - price
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '605c72ef1c4f1f001f647fbd'
 *                 name:
 *                   type: string
 *                   example: 'Updated Laptop'
 *                 price:
 *                   type: number
 *                   example: 899.99
 *                 category:
 *                   type: string
 *                   example: 'Electronics'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

// Route to update a product
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the inventory.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
