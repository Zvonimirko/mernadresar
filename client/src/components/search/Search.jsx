import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchContacts } from "../../actions/contactActions";
import PropTypes from "prop-types";

import "./search.scss";

const Search = ({ searchContacts, page, location }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    searchContacts(searchText, page, location);
  }, [searchText, searchContacts, page]);

  return (
    <input
      type="text"
      value={searchText}
      placeholder="Search"
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
    />
  );
};

Search.propTypes = {
  searchContacts: PropTypes.func.isRequired,
};

export default connect(null, { searchContacts })(Search);
