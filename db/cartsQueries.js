const pool = require('../config/db');

// Create a new cart
const createCart = async (user_id) => {
  const result = await pool.query(
    'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
    [user_id]
  );
  return result.rows[0].id;
};

// Add a product to a cart
const addToCart = async (cart_id, product_id, quantity, price) => {
  const result = await pool.query(
    'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING id',
    [cart_id, product_id, quantity, price]
  );
  return result.rows[0].id;
};

// Get the contents of a cart
const getCart = async (cart_id) => {
  const result = await pool.query(
    'SELECT ci.id, p.name, ci.quantity, ci.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
    [cart_id]
  );
  return result.rows;
};


module.exports = {
  createCart,
  getCart,
  addToCart
}