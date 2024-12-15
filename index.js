const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
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
const cartgoryRoutes = require("./routes/cartgoryRoutes");
const initializePassport = require("./config/passport");

const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

// Swagger setup
swaggerDocs(app, port);

// initialize passport
initializePassport(passport);

// middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
//for securing different HTTP headers
app.use(helmet());
app.use(cookieParser()); 

// session configuration

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 1000 * 60 * 60,
    },
  })
);

// mount passport and session
app.use(passport.initialize());
app.use(passport.session());

//static files
const buildPath = path.join(__dirname, "views/build");
app.use(express.static(buildPath));

// Routes
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cartegories", cartgoryRoutes);
app.use('/auth', authRoutes);

app.get("/status", (req, res) => {
  console.log("isAuthenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    // If the user is authenticated via session
    res.json({ message: "Authenticated", user: req.user });
  } else {
    // If not authenticated, check if there's a valid JWT in the cookies
    const token = req.cookies?.token;

    console.log(token)
    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        res.json({ message: "Authenticated", user: user });
      });
    } else {
      res.json({ message: "Not authenticated" });
    }
  }
});



// render static files from the build folder from view react folder or fallback route for react
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


// render static files from the build folder from view react folder
// app.get("/", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
