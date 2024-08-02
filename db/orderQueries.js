// const pool = require("../config/db");
const pool = require('..//models/database')

const createOrder = async (user_id, total, status) => {
  const result = await pool.query(
    "INSERT INTO orders (user_id, total, status) values ($1, $2, $3) RETURNING  id",
    [user_id, total, status]
  );

  return result.rows[0].id;
};

// Create order items
const createOrderItems = async (order_id, cartItems) => {
  try {
    if (cartItems.length === 0) {
      throw new Error('No items to add to order.');
    }

    const query = `
      INSERT INTO order_items (order_id, product_id, quantity, price) 
      VALUES ${cartItems.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ')}
    `;
    
    const values = cartItems.flatMap(item => [order_id, item.product_id, item.quantity, item.price]);

    await pool.query(query, values);
  } catch (error) {
    console.error('Error creating order items:', error);
    throw error;
  }
};


// Clear a cart after successful checkout
const clearCart = async (cart_id) => {
  await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart_id]);
};

// db/orderQueries.js

const getOrdersByUser = async (user_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1',
      [user_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching orders by user:', error);
    throw error;
  }
};

// db/orderQueries.js

const getOrderById = async (order_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [order_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

const getOrderItemsByOrderId = async (order_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [order_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching order items by order ID:', error);
    throw error;
  }
};



module.exports = {
  createOrder,
  createOrderItems,
  clearCart,
  getOrdersByUser,
  getOrderById,
  getOrderItemsByOrderId,
};
