// const Contact = require("../Models/Contact");

// /*  USER CRUD OPERATIONS  */

// // FETCH ALL USERS
// const fetchUsers = async (req, res) => {
//   try {
//     const users = await Contact.find().select("-password"); // exclude password
//     res.json({ success: true, data: users });
//   } catch (err) {
//     console.error("Fetch users error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // EDIT USER
// const editUsers = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
//     const { id } = req.params;

//     const existing = await Contact.findOne({
//       _id: { $ne: id }, 
//       $or: [{ email }, { phone }, { name }],
//     });

//     if (existing) {
//       return res.status(400).json({
//         message:
//           existing.email === email
//             ? "Email already exists"
//             : existing.phone === phone
//             ? "Phone already exists"
//             : "Name already exists",
//       });
//     }

//     const updated = await Contact.findByIdAndUpdate(
//       id,
//       { name, email, phone },
//       { new: true }
//     );

//     res.json({ success: true, data: updated });
//   } catch (err) {
//     console.error("Edit user error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE USER
// const deleteUsers = async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "User deleted" });
//   } catch (err) {
//     console.error("Delete user error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { fetchUsers, editUsers, deleteUsers };



const Contact = require("../Models/Contact");

// FETCH ALL USERS
const fetchUsers = async (req, res) => {
  try {
    const users = await Contact.find().select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: err.message });
  }
};

// FETCH SINGLE USER
const fetchUserById = async (req, res) => {
  try {
    const user = await Contact.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    console.error("Fetch single user error:", err);
    res.status(500).json({ message: err.message });
  }
};

// EDIT USER
const editUsers = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    const existing = await Contact.findOne({
      _id: { $ne: id },
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

module.exports = { fetchUsers, fetchUserById, editUsers, deleteUsers };


// const Contact = require("../Models/Contact");
// const jwt = require("jsonwebtoken");

// // FETCH CURRENT USER
// const fetchCurrentUser = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const user = await Contact.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ success: true, data: user });
//   } catch (err) {
//     console.error("Fetch current user error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // FETCH ALL USERS
// const fetchUsers = async (req, res) => {
//   try {
//     const users = await Contact.find().select("-password");
//     res.json({ success: true, data: users });
//   } catch (err) {
//     console.error("Fetch users error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // FETCH SINGLE USER
// const fetchUserById = async (req, res) => {
//   try {
//     const user = await Contact.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ success: true, data: user });
//   } catch (err) {
//     console.error("Fetch single user error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // EDIT USER
// const editUsers = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
//     const { id } = req.params;

//     const existing = await Contact.findOne({
//       _id: { $ne: id },
//       $or: [{ email }, { phone }, { name }],
//     });

//     if (existing) {
//       let message = "Field already exists";
//       if (existing.email === email) message = "Email already exists";
//       else if (existing.phone === phone) message = "Phone already exists";
//       else if (existing.name === name) message = "Name already exists";

//       return res.status(400).json({ message });
//     }

//     const updated = await Contact.findByIdAndUpdate(
//       id,
//       { name, email, phone },
//       { new: true }
//     ).select("-password");

//     res.json({ success: true, data: updated });
//   } catch (err) {
//     console.error("Edit user error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // DELETE USER
// const deleteUsers = async (req, res) => {
//   try {
//     const user = await Contact.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ success: true, message: "User deleted" });
//   } catch (err) {
//     console.error("Delete user error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   fetchCurrentUser,
//   fetchUsers,
//   fetchUserById,
//   editUsers,
//   deleteUsers,
// };
