import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { paginateContacts } from "../../actions/contactActions";

import "./pagination.scss";

const Pagination = ({
  page,
  setPage,
  paginateContacts,
  contacts,
  location,
}) => {
  useEffect(() => {
    paginateContacts(page, location);
    if (
      location === "/favourites" &&
      page + 1 > Math.ceil(favouriteLength / 7)
    ) {
      setPage(0);
    }
  }, [page, setPage, location]);

  const favouriteLength = contacts.filter(
    (contact) => contact.favourite === true
  ).length;

  const onPageUp = () => {
    if (
      location === "/favourites" &&
      page + 1 < Math.ceil(favouriteLength / 7)
    ) {
      setPage(page + 1);
    } else if (
      location !== "/favourites" &&
      page + 1 < Math.ceil(contacts.length / 7)
    )
      setPage(page + 1);
  };

  const onPageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="contacts-main__pagination">
      <div className="contacts-main__pagination__change" onClick={onPageDown}>
        Prev
      </div>
      <div>
        <p>
          <span>{page + 1}</span> od{" "}
          <span>
            {location === "/favourites"
              ? favouriteLength && Math.ceil(favouriteLength / 7)
              : contacts.length && Math.ceil(contacts.length / 7)}
          </span>
        </p>
      </div>
      <div className="contacts-main__pagination__change" onClick={onPageUp}>
        Next
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStatToProps = (state) => ({
  contacts: state.contacts.contacts,
});

export default connect(mapStatToProps, { paginateContacts })(Pagination);
