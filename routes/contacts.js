const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

const Contact = require("../models/Contact");

// @route   POST api/contacts
// @desc    Create Contact
// @access  Private

router.post(
  "/",
  [
    check("name")
      .notEmpty()
      .withMessage("Contact name is required")
      .isLength({ max: 100 })
      .withMessage("Must be less than 100 characters long"),
    check("lastname")
      .notEmpty()
      .withMessage("Contact last name is required")
      .isLength({ max: 300 })
      .withMessage("Must be less than 100 characters long"),
    check("typeofcontact", "What type of contact is it").notEmpty(),
    check("contact", "Contact is required").notEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, dateofbirth, typeofcontact, contact } = req.body;

    const contactFields = {};
    contactFields.user = req.user.id;

    if (name) contactFields.name = name;
    if (lastname) contactFields.lastname = lastname;
    if (dateofbirth) contactFields.dateofbirth = dateofbirth;
    if (typeofcontact) contactFields.typeofcontact = typeofcontact;
    if (contact) contactFields.contact = contact;

    try {
      let contact = await Contact.findOne({ name, lastname, dateofbirth });

      if (contact) {
        // Update
        contact = await Contact.findOneAndUpdate(
          { name, lastname, dateofbirth },
          { contact: contactFields.contact },
          { new: true }
        );
        return res.json(contact);
      }

      // Create

      contact = new Contact(contactFields);

      await contact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/contacts
// @desc    Get contacts for user
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/contacts/:contact_id
// @desc    Delete a contact
// @access  Private

router.delete("/:contact_id", auth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.contact_id,
    });

    res.send("Contact Removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/contacts/:contact_id
// @desc    Get contact by id
// @access  Private

router.get("/:contact_id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contact_id);

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/contacts/favourite/:contact_id
// @desc    Toggle favourite
// @access  Private

router.put("/favourite/:contact_id", auth, async (req, res) => {
  const { favourite } = req.body;

  if (favourite) newFavourite = favourite;

  try {
    const contact = await Contact.findById(req.params.contact_id);
    const newContact = await Contact.findOneAndUpdate(
      { _id: req.params.contact_id },
      { favourite: !contact.favourite },
      { new: true }
    );

    res.json(newContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
