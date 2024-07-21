const pool = require('../config/db');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  const results = await pool.query('SELECT * FROM users order by id asc');
  console.log(results.rows);
  return results.rows;
};

const getUserById = async (id) => {
  const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return results.rows[0];
};

const createUser = async (name, email) => {
  const results = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
    [name, email]
  );
  return results.rows[0].id;
};

const updateUser = async (id, name, email) => {
  const results = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return results.rows[0];
};

const deleteUser = async (id) => {
  const results = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return results.rows[0];
};

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // hash the password first
//     const hashedPassword = await bcrypt.hash(password, 10);

//     pool.query(
//       'INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hashedPassword], (err,results) => {
//         if (err) throw err;
//         res.status(201).send(`You have successfully been registerd with ID: ${results.rows[0].id}`);
//       }
//     )
//   } catch (error) {
//     res.status(500).send(error.message);
//   }

// }



const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const usersResult = await pool.query('SELECT * FROM users WHERE name = $1 OR email = $2', [name, email]);
    const users = usersResult.rows;

    if (users.length > 0) {
      return res.status(409).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    res.status(201).send(`User registered with ID: ${result.rows[0].id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  // createUser,
  updateUser,
  deleteUser,
  registerUser,
};