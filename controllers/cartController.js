const db = require('../db/cartsQueries');

// Create a new cart
const createCart = async (req, res) => {
  // const { user_id } = req.body.user_id;
  const user_id = parseInt(req.body.user_id, 10);
  try {
    const cartId = await db.createCart(user_id);
    res.status(201).json({ cart_id: cartId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a product to a cart
const addToCart = async (req, res) => {
  const cartId = parseInt(req.params.cartId, 10);
  const { product_id, quantity, price } = req.body;
  try {
    const cartItemId = await db.addToCart(cartId, product_id, quantity, price);
    res.status(201).json({ cart_item_id: cartItemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get the contents of a cart
const getCart = async (req, res) => {
  const cartId = parseInt(req.params.id, 10);
  try {
    const cartItems = await db.getCart(cartId);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCart,
  addToCart,
  getCart
};
