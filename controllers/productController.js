const db = require('../db/productQueries');

// create new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const productId = await db.createProduct(name, description, price, stock);
    res.status(201).json({message: 'Product created successfully', productId});
  } catch (error) {
      res.status(500).json({error: 'Internal Server Error'});
  }
};

// get product with optional filters
const getProducts = async (req, res) => {
  try {
    const { category, price_min, price_max } = req.query;
    const products = await db.getProducts(category, price_min, price_max);
    res.status(200).json(products);
  } catch (error) {
      res.status(500).json({error: 'Internal Server Error'});
  }
};

// get by id
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID'});
    }
    const product = await db.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found'});
    }
    res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error'});
  }
};

// update the product
const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description, price, stock } = req.body;
    const updatedProduct = await db.updateProduct(id, name, description, price, stock);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found'});
    }
    res.status(200).json({ message: 'Product updated successfully', updatedProduct});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const deletedProduct = await db.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
