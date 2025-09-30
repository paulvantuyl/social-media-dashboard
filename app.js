const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = SECRET_250929;

mongoose.set("strictQuery", false);

const uri = DB_USER;
mongoose.connect(uri, { dbName: "USERS_DB" });

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});
const Post = mongoose.model("Post", {
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Insert your authenticateJWT Function code here.
function authenticateJWT(req, res, next) {
  // Get token from session
  const token = req.session.token;

  // If no token, return 401 Unauthorized
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user data to request
    req.user = decoded;

    // Continue to the next middleware
    next();
  } catch (error) {
    // If invalid token, return 401
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Insert your requireAuth Function code here.
function requireAuth(req, res, next) {
  // Retrieve token from session
  const token = req.session.token;

  // If no token, redirect to login page
  if (!token) return res.redirect("/login");

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY);
    // Attach decoded user data to the request
    req.user = decoded;
    // Pass control to the next middleware/route
    next();
  } catch (error) {
    // If token is invalid, redirect to login page
    return res.redirect("/login");
  }
}

// Insert your routing HTML code here.

// Insert your user registration code here.

// Insert your user login code here.

// Insert your post creation code here.

// Insert your post updation code here.

// Insert your post deletion code here.

// Insert your user logout code here.

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
