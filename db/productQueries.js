const pool = require("../config/db");

// Create a new product
const createProduct = async (name, description, price, stock) => {
  const result = await pool.query(
    "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING id",
    [name, description, price, stock]
  );
  return result.rows[0].id;
};

// get all products with optional filters
const getProducts = async (category, price_min, price_max) => {
  // let query = 'SELECT * FROM products WHERE 1 = 1';

  let query = `
    SELECT p.* FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    query += `AND category_id = $${params.length + 1}`;
    params.push(category);
  }

  if (price_min) {
    query += ` AND price >= $${params.length + 1}`;
    params.push(price_min);
  }

  if (price_max) {
    query += ` AND price <= $${params.length + 1}`;
    params.push(price_max);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

// get product by id
const getProductById = async (id) => {
  const product = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return product.rows[0];
};

// Update a product
const updateProduct = async (id, name, description, price, stock) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
    [name, description, price, stock, id]
  );
  return result.rows[0];
};

// Because the product connected to category via products_category table
// we need to delete first from the product_categories table and then the product table
const deleteProduct = async (id) => {
  try {
    // Delete related entries from product_categories first
    await pool.query("DELETE FROM product_categories WHERE product_id = $1", [
      id,
    ]);

    // Then delete the product from products
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
