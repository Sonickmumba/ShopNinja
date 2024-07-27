const orderQueries = require('../db/orderQueries');

const getOrders = async (req, res) => {
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);
  console.log('Request user:', req.user); // Debugging line
  const user_id = req.user.id;

  try {
    const orders = await orderQueries.getOrdersByUser(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getOrderDetails = async (req, res) => {
  const user_id = req.user.id;
  const order_id = parseInt(req.params.orderId, 10);

  try {
    // Fetch order details
    const order = await orderQueries.getOrderById(order_id);
    if (!order || order.user_id !== user_id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Fetch order items
    const orderItems = await orderQueries.getOrderItemsByOrderId(order_id);

    res.status(200).json({ order, items: orderItems });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getOrderDetails,
  getOrderDetails,
  getOrders
};



// module.exports = {
//   getOrders,
// };
