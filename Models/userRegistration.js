// userRegistration.js
const express = require("express");
const router = express.Router();

// In-memory "database"
const users = [];

// -------------------
// Helper: Check if user exists
// -------------------
const checkUserExists = (field, value) => {
  return users.some((user) => user[field] === value);
};

// -------------------
// POST /register
// -------------------
router.post("/register", (req, res) => {
  const { name, phone, email } = req.body;

  // Backend validation
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required.";
  else if (!/^[a-zA-Z\s]{2,50}$/.test(name))
    errors.name = "Name should be 2-50 letters only.";

  if (!phone || !/^\+?[0-9]{7,15}$/.test(phone))
    errors.phone = "Enter a valid phone number.";

  if (!email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
    errors.email = "Enter a valid email.";

  // Check duplicates
  if (checkUserExists("email", email)) errors.email = "Email already exists.";
  if (checkUserExists("phone", phone)) errors.phone = "Phone already exists.";
  if (checkUserExists("name", name)) errors.name = "Name already exists.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Save user
  const newUser = { id: Date.now(), name, phone, email };
  users.push(newUser);

  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

// -------------------
// GET /check-user?field=email&value=test@example.com
// -------------------
router.get("/check-user", (req, res) => {
  const { field, value } = req.query;
  if (!field || !value)
    return res.status(400).json({ message: "Invalid query" });

  const exists = checkUserExists(field, value);
  return res.json({ exists });
});

module.exports = router;
