import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ContactsItem from "./contact/contactItem/ContactsItem";
import { getContacts } from "../../actions/contactActions";
import { paginateContacts } from "../../actions/contactActions";

import "./contacts.scss";
import Spinner from "../spinner/Spinner";
import Search from "../search/Search";
import Sort from "../sort/Sort";
import Pagination from "../pagination/Pagination";

const Contacts = ({
  contacts: { contacts, loading },
  getContacts,
  auth: { isAuthenticated },
  history,
  contactsPerPage,
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    isAuthenticated && getContacts(page, history.location.pathname);
  }, [getContacts, isAuthenticated]);

  return (
    <div className="contacts-main">
      <div className="contacts-main__list">
        <div className="contacts-main__list__header">
          <Link
            className="contacts-main__list__header__add-contact"
            to="/create-contact"
          >
            <span
              className="iconify"
              data-inline="false"
              data-icon="ant-design:user-add-outlined"
              style={{ fontSize: "40px" }}
            ></span>
          </Link>
          <div className="contacts-main__list__header__title">Name</div>
          <div className="contacts-main__list__header__title">Last Name</div>
          <div className="contacts-main__list__header__title">Contact</div>
          <div className="contacts-main__list__header__options">
            <div className="contacts-main__list__header__options__top">
              <div className="contacts-main__list__header__options__top__per-page"></div>
              <Sort page={page} location={history.location.pathname} />
            </div>
            <div className="contacts-main__list__header__options__bottom">
              <Search page={page} location={history.location.pathname} />
            </div>
          </div>
        </div>
        <div className="contacts-main__list__body">
          {!loading && contactsPerPage.length > 0 ? (
            history.location.pathname === "/favourites" ? (
              contactsPerPage
                .filter((contact) => contact.favourite === true)
                .map((contact) => (
                  <ContactsItem key={contact._id} contact={contact} />
                ))
            ) : (
              contactsPerPage.map((contact) => (
                <ContactsItem key={contact._id} contact={contact} />
              ))
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        location={history.location.pathname}
      />
    </div>
  );
};

Contacts.propTypes = {
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
  auth: state.auth,
  contactsPerPage: state.contacts.contactsPerPage,
  paginateContacts: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getContacts, paginateContacts })(
  withRouter(Contacts)
);
