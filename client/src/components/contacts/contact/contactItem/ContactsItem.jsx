import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleFavourite } from "../../../../actions/contactActions";

import "./contactsItem.scss";

const ContactsItem = ({
  contact: { name, lastname, contact, _id, favourite },
  toggleFavourite,
}) => {
  const handleClick = () => {
    toggleFavourite(_id);
  };

  return (
    <div className="contacts-main__list__body__item">
      <p>{name}</p>
      <p>{lastname}</p>
      <p>{contact}</p>
      <p>
        <Link to={`/contactDetails/${_id}`}>
          <span
            className="iconify"
            data-inline="false"
            data-icon="bi:pen"
            style={{ fontSize: "20px" }}
          ></span>
        </Link>
        <span onClick={handleClick} key={favourite}>
          <span
            className="iconify"
            data-inline="false"
            data-icon={favourite ? `clarity:star-solid` : `akar-icons:star`}
            style={{ fontSize: "20px" }}
          ></span>
        </span>
      </p>
    </div>
  );
};

ContactsItem.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default connect(null, { toggleFavourite })(ContactsItem);
