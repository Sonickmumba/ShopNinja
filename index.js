const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./db/queries');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API Template by Sonick Mumba' });
});

// route for user registration
app.post('/register', db.registerUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
