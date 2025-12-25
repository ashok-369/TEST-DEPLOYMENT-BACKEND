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
