const pool = require("..//models/database");

// get all the carts

const cartController = {
  // getAllCarts: async (req, res) => {
  //   try {
  //     const response = await pool.query("SELECT * FROM carts");
  //     // const carts = await response.json();
  //     const carts = response.rows;
  //     res.status(200).json({ message: "successfull", carts });
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ error: "An error occurred while getting all the cart" });
  //   }
  // },

  // get cart for the user
  getCart: async (req, res) => {
    const userId = parseInt(req.params.user_id, 10);

    if (!userId) {
      return res.status(400).json({ error: "User id is required" });
    }

    try {
      const userCartResult = await pool.query(
        "SELECT * from carts WHERE user_id = $1",
        [userId]
      );

      console.log("here",userCartResult.rows[0])

      if (userCartResult.rows.length === 0) {
        res.status(404).json({ message: "Cart not found" });
      }

      const cart = userCartResult.rows[0];

      console.log("for id", cart.id);

      // const cartResult = await pool.query(
      //   "SELECT * FROM cart_items WHERE cart_id = $1",
      //   [cart.id]
      // );



      const cartResult = await pool.query(
        `
        SELECT 
          ci.id AS cart_item_id,
          ci.quantity,
          ci.price,
          ci.created_at,
          ci.updated_at,
          p.id AS product_id,
          p.name AS product_name,
          p.image_url AS product_image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1
        `,
        [cart.id]
      );



      const items = cartResult.rows;

      console.log(items)

      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      res.status(200).json({ ...cart, items, totalQuantity, totalPrice });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the cart" });
    }
  },

  // add item to the cart

  addItem: async (req, res) => {
    const {userId, product_id, quantity, price } = req.body;
    console.log(userId)

    if (!product_id || !quantity || !price) {
      return res.status(400).json({ error: "All field are required: product_id, quantity, price"})
    }
    
    try {
      // check if the cart exists for the user in the carts table
      const userCartExists = await pool.query("SELECT * FROM carts WHERE user_id = $1", [userId]);
      console.log(userCartExists.rows)

      let cartId;

      if (userCartExists.rows.length === 0) {
        const newUserCartId = await pool.query("INSERT INTO carts (user_id,) VALUES ($1) RETURNING id", [userId]);
        cartId = newUserCartId.rows[0].id;
      } else {
        cartId =userCartExists.rows[0].id;
      }

      // check if the product is already in the cart

      const itemResult = await pool.query("SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cartId, product_id]);

      if (itemResult.rows.length > 0) {
        // product already exists, update the quantity

        await pool.query("UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3", [quantity, cartId, product_id]);
      } else {
        // add a new product to the cart
        await pool.query("INSERT INTO cart_items (cart_id, product_id, quantity, price ) VALUES ($1, $2, $3, $4)", [cartId, product_id, quantity, price]);

      }

      return res.status(200).json({message: "Item added to the cart successfully."});

    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Failed to add item to the cart" });
    }
    
  },

  // update quantity of an item in a cart

  updateItem: async(req, res) => {
    const { cartItemId, quantity } = req.body;

    if (!cartItemId || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid cart item or quantity.' });
    }

    try {
      await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE id = $2',
        [quantity, cartItemId]
      );

      return res.status(200).json({ message: 'Cart item updated successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update cart item.' });
    }
  },

  // 
  removeItem: async (req, res) => {
    const cartItemId = parseInt(req.params.id, 10);

    if (!cartItemId) {
      return res.status(400).json({ error: 'Cart item ID is required.' });
    }

    try {
      await pool.query(
        'DELETE FROM cart_items WHERE id = $1',
        [cartItemId]
      );

      return res.status(200).json({ message: 'Cart item removed successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to remove cart item.' });
    }
  },

  /**
   * Clear all items from the cart.
   */
  clearCart: async (req, res) => {
    const cartId = req.params.id;

    if (!cartId) {
      return res.status(400).json({ error: 'Cart ID is required.' });
    }

    try {
      await pool.query(
        'DELETE FROM cart_items WHERE cart_id = $1',
        [cartId]
      );

      return res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to clear cart.' });
    }
  },

};

module.exports = cartController;
