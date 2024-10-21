const pool = require("..//models/database");

const createCartegory = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING id",
    [name, description]
  );
  return result.rows[0].id;
};

const getCartegories = async () => {
  const response = await pool.query('SELECT * FROM cartegory order by id asc');
  return response.rows[0];
}



module.default = {
  createCartegory,
  getCartegories,
}