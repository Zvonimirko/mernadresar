const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
  },
  typeofcontact: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
