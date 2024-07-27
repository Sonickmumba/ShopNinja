const pool = require("../config/db");

const createOrder = async (user_id, total, status) => {
  // console.log('Creating order with:', { user_id, total, status });
  const result = await pool.query(
    "INSERT INTO orders (user_id, total, status) values ($1, $2, $3) RETURNING  id",
    [user_id, total, status]
  );
  // console.log('Order creation result:', result.rows);
  return result.rows[0].id;
};

// Create order items
// const createOrderItems = async (order_id, cartItems) => {
//   console.log('Creating order with:', { order_id, cartItems });
//   const query = `
//     INSERT INTO order_items (order_id, product_id, quantity, price) 
//     VALUES ${cartItems
//       .map(
//         (item) =>
//           `(${order_id}, ${item.product_id}, ${item.quantity}, ${item.price})`
//       )
//       .join(", ")}
//   `;
  
//   await pool.query(query);
// };




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

module.exports = {
  createOrder,
  createOrderItems,
  clearCart,
};
