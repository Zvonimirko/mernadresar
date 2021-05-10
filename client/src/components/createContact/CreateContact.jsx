import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createContact } from "../../actions/contactActions";
import moment from "moment";
import PropTypes from "prop-types";

import "./createContact.scss";

const CreateContact = ({ createContact, contactInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    typeofcontact: "tel",
    dateofbirth: "",
    contact: "",
  });

  const { name, lastname, typeofcontact, dateofbirth, contact } = formData;

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        ...contactInfo,
        dateofbirth: moment(contactInfo.dateofbirth).format("YYYY-MM-DD"),
      });
    }
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(formData);
    setFormData({
      name: "",
      lastname: "",
      typeofcontact: "tel",
      dateofbirth: "",
      contact: "",
    });
  };

  return (
    <div className="contact-main">
      <h1>Create a Contact</h1>
      <form className="contact-main__form" onSubmit={handleSubmit}>
        <div className="contact-main__form__input">
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            maxLength="50"
          />
        </div>
        <div className="contact-main__form__input">
          <p>Last Name</p>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            maxLength="50"
          />
        </div>
        <div className="contact-main__form__input">
          <p>Date of Birth</p>
          <input
            type="date"
            name="dateofbirth"
            value={dateofbirth}
            onChange={handleChange}
          />
        </div>
        <div className="contact-main__form__input">
          <p>Type of Contact</p>
          <select
            name="typeofcontact"
            value={typeofcontact}
            onChange={handleChange}
          >
            <option value="tel">Tel</option>
            <option value="mobile">Mobile</option>
            <option value="Email">Email</option>
            <option value="Pages">Pager</option>
          </select>
        </div>
        <div className="contact-main__form__input">
          <p>Contact</p>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={handleChange}
            maxLength="50"
          />
        </div>
        <button className="contact-main__form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

CreateContact.propTypes = {
  createContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactInfo: state.details.contact,
});

export default connect(mapStateToProps, { createContact })(CreateContact);
