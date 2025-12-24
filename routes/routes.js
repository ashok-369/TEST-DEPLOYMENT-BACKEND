const express = require("express");
const router = express.Router();

// Import controllers
const { fetchUsers, editUsers, deleteUsers } = require("../controller/userController");
const { registerUser } = require("../controller/registerController");
const { loginUser } = require("../controller/loginController");


// ----------------- Auth Routes -----------------
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
//router.get("/auth/check-user", checkUserExists);

// ----------------- User CRUD Routes -----------------
router.get("/users", fetchUsers);        // Fetch all users
router.put("/users/:id", editUsers);    // Edit user
router.delete("/users/:id", deleteUsers); // Delete user

module.exports = router;


// // routes/routes.js
// const express = require("express");
// const router = express.Router();

// // Controllers
// const { fetchUsers, fetchUserById, editUsers, deleteUsers, fetchCurrentUser } = require("../controller/userController");
// const { registerUser } = require("../controller/registerController");
// const { loginUser } = require("../controller/loginController");

// // Middleware
// const authenticate = require("../middleware/auth");

// // ----------------- Auth Routes -----------------
// router.post("/auth/register", registerUser);   // Register a new user
// router.post("/auth/login", loginUser);         // Login
// router.get("/auth/me", authenticate, fetchCurrentUser); // Get current logged-in user

// // ----------------- User CRUD Routes -----------------
// router.get("/users", authenticate, fetchUsers);         // Fetch all users
// router.get("/users/:id", authenticate, fetchUserById);  // Fetch single user by ID
// router.put("/users/:id", authenticate, editUsers);     // Edit user
// router.delete("/users/:id", authenticate, deleteUsers); // Delete user

// module.exports = router;
