const Contact = require("../Models/Contact");

// Save contact form data
const UserData = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    console.log(req.body, "request object");

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to database
    const newContact = new Contact({
      name,
      phone,
      email,
      message,
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Contact details saved successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving contact details",
      error: error.message,
    });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const getUsers = await Contact.find();
    console.log("getUsers", getUsers);
    res.status(200).json({
      success: true,
      data: getUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

// const editUsers = async (req, res) => {
//   try {
//     const {id}=req.params;
//     if(!id){
//       return res.status(400).json({
//         message:"wrong id"
//       })
//     }

    
    
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "server failure",
//     });
//   }
// };
const editUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const { name, phone, email, message } = req.body;

    if (!name && !phone && !email && !message) {
      return res.status(400).json({
        success: false,
        message: "No data provided to update",
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (message) updateData.message = message;

    const updatedUser = await Contact.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Edit user error:", err);
    return res.status(500).json({
      success: false,
      message: "Server failure",
    });
  }
};


module.exports = {
  UserData,
  fetchUsers,
  editUsers
};
