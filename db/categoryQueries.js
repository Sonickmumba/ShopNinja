const pool = require("..//models/database");

const createCartegory = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id",
    [name, description]
  );
  return result.rows[0].id;
};

const getCartegories = async () => {
  console.log('sonick')
  const respo = await pool.query('SELECT * FROM categories ORDER BY id ASC');
  return respo.rows;
}



module.default = {
  createCartegory,
  getCartegories,
}