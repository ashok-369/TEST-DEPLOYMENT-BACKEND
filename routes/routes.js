const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js");

// Contact routes
router.post("/contact", UserController.UserData);
router.get("/fetch-users", UserController.fetchUsers);
router.put("/edit-users/:id", UserController.editUsers);
router.delete("/delete-users/:id", UserController.deleteUsers);

// Auth routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// **New route for checking if user exists**
router.get("/check-user", UserController.checkUserExists);

module.exports = router;
