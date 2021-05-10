import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getContactById } from "../../../../actions/contactActions";
import { deleteContact } from "../../../../actions/contactActions";
import PropTypes from "prop-types";
import Spinner from "../../../spinner/Spinner";

import "./contactDetails.scss";

const ContactDetails = ({
  details: { contact, loading },
  match,
  auth: { isAuthenticated },
  getContactById,
  history,
  deleteContact,
}) => {
  useEffect(() => {
    isAuthenticated && getContactById(match.params.contact_id);
  }, [isAuthenticated, getContactById, match.params.contact_id]);

  const handleClick = () => {
    deleteContact(match.params.contact_id);
    history.push("/contacts");
  };

  return (
    <div className="contact-details__container">
      {contact && !loading ? (
        <div className="contact-details__container__main">
          <h1>Contact Details</h1>
          <div className="contact-details__container__main__info">
            <div className="contact-details__container__main__info__left">
              <h2>Name</h2>
              <h2>Last Name</h2>
              <h2>Date of Birth</h2>
              <h2>Type of Contact</h2>
              <h2>Contact</h2>
            </div>
            <div className="contact-details__container__main__info__right">
              <p>{contact.name}</p>
              <p>{contact.lastname}</p>
              <p>{contact.dateofbirth}</p>
              <p>{contact.typeofcontact}</p>
              <p>{contact.contact}</p>
            </div>
          </div>
          <div className="contact-details__container__main__buttons">
            <Link
              className="contact-details__container__main__buttons__edit"
              to="/create-contact"
            >
              Edit
            </Link>
            <button
              className="contact-details__container__main__buttons__delete"
              onClick={handleClick}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
};

ContactDetails.propTypes = {
  details: PropTypes.object.isRequired,
  getContactById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  details: state.details,
});

export default connect(mapStateToProps, { getContactById, deleteContact })(
  withRouter(ContactDetails)
);
