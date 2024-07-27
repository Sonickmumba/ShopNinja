const cartsQueries = require("../db/cartsQueries");
const orderQueries = require("../db/orderQueries");
const paymentService = require('../utils/paymentService');

const checkout = async (req, res) => {
  const cart_id = parseInt(req.params.cart_id, 10);
  const { user_id, payment_details } = req.body;

  try {
    const cartItems = await cartsQueries.getCart(cart_id);

    if (cartItems.length == 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const status = 'successful';

    // Step 2: Process the Payment
    const paymentResult = await paymentService.processPayment(payment_details);
    if (!paymentResult.success) {
      return res.status(400).json({ error: "Payment failed" });
    } else {
      // status = "successful";   remember to implement this. For now its the default used.
    }

    // create order
    const order_id = await orderQueries.createOrder(user_id, total, status);
    await orderQueries.createOrderItems(order_id, cartItems);
    await orderQueries.clearCart(cart_id);

    res.status(201).json({ order_id: order_id });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  checkout,
};
