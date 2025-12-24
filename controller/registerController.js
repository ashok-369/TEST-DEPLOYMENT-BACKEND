const Contact = require("../Models/Contact");
const bcrypt = require("bcrypt");

/*  USER REGISTRATION  */

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check for duplicates
    const existing = await Contact.findOne({ $or: [{ email }, { phone }, { name }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          existing.email === email
            ? "Email already exists"
            : existing.phone === phone
            ? "Phone already exists"
            : "Name already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newContact = await Contact.create({ name, email, phone, password: hashedPassword });

    res.status(201).json({ success: true, message: "Registration successful!", data: newContact });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { registerUser };
