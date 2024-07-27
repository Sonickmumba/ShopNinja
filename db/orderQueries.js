const pool = require('../config/db');

const createOrder = async (user_id, total, status) => {
  const result = await pool.guery('INSERT INTO orders (user_id, total, status) values ($1, $2, $3) RETURNING  id', [user_id, total, status]);
  return result.rows[0].id;
};

// Create order items
const createOrderItems = async (order_id, cartItems) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity, price) 
    VALUES ${cartItems.map(item => `(${order_id}, ${item.product_id}, ${item.quantity}, ${item.price})`).join(', ')}
  `;
  await pool.query(query);
};

// Clear a cart after successful checkout
const clearCart = async (cart_id) => {
  await pool.query(
    'DELETE FROM cart_items WHERE cart_id = $1',
    [cart_id]
  );
};

module.exports = {
  createOrder,
  createOrderItems,
  clearCart
};