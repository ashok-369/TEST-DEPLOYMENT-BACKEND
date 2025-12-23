const Contact = require("../Models/Contact");

/* ================= USER OPERATIONS ================= */

// FETCH ALL USERS
const fetchUsers = async (req, res) => {
  try {
    const users = await Contact.find();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: err.message });
  }
};

// EDIT USER
const editUsers = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    // Check duplicates in other users
    const existing = await Contact.findOne({
      _id: { $ne: id }, // exclude current user
      $or: [{ email }, { phone }, { name }],
    });

    if (existing) {
      return res.status(400).json({
        message:
          existing.email === email
            ? "Email already exists"
            : existing.phone === phone
            ? "Phone already exists"
            : "Name already exists",
      });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Edit user error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
const deleteUsers = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: err.message });
  }
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json({ success: true, message: "Registration successful!", data: newContact });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// LOGIN USER (by email only)
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Contact.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email not found" });

    res.json({ success: true, message: "Login successful", user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// REAL-TIME CHECK USER
const checkUserExists = async (req, res) => {
  try {
    const { name, email, phone } = req.query;
    const user = await Contact.findOne({ ...(name && { name }), ...(email && { email }), ...(phone && { phone }) });
    res.json({ exists: !!user });
  } catch (err) {
    console.error("Check user error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchUsers, editUsers, deleteUsers, registerUser, loginUser, checkUserExists };
