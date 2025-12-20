const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js");

router.post("/contact", UserController.UserData);
router.get("/fetch-users", UserController.fetchUsers);
router.put("/edit-users/:id", UserController.editUsers);
router.delete("/delete-users/:id", UserController.deleteUsers)

module.exports = router;
