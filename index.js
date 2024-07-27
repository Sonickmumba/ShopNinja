const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const db = require('./db/queries');
const initializePassport = require('./config/passport');


const app = express();
const port = process.env.PORT || 3000;

// initialize passport
initializePassport(passport);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));

// mount passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API Template by Sonick Mumba' });
});

// route for user registration
app.post('/register', db.registerUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
