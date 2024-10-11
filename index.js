const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
require("dotenv").config();

const swaggerDocs = require("./utils/swagger");

const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const initializePassport = require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
swaggerDocs(app, port);

// initialize passport
initializePassport(passport);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }, // helps mitigate the risk of client-side script accessing the protected cookie.
  })
);

//for securing different HTTP headers
app.use(helmet());

// mount passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", checkoutRoutes);
app.use("/api/orders", orderRoutes);

app.get("/test", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Authenticated", user: req.user });
  } else {
    res.json({ message: "Not authenticated" });
  }
});

app.get("/", (req, res) => {
  res.json({
    info: "Node.js, Express, and Postgres API Template by Sonick Mumba",
  });
});

// route for user registration
// app.post('/register', db.registerUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
