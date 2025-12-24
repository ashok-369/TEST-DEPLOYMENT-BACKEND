const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, },
    phone: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    password: { type: String, required: true, minlength: 6, select: false, },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
