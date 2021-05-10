import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sortContacts } from "../../actions/contactActions";
import PropTypes from "prop-types";

import "./sort.scss";

const Sort = ({ sortContacts, page, location }) => {
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    sortContacts(sortOrder, page, location);
  }, [sortOrder, sortContacts, page]);

  const handleClick = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <div className="contacts-main__list__header__options__top__sort">
      <p onClick={handleClick}>
        {sortOrder === "asc" ? (
          <>
            <span className="sort-a">Z</span> -{" "}
            <span className="sort-z">A</span>
          </>
        ) : (
          <>
            <span className="sort-a">A</span> -{" "}
            <span className="sort-z">Z</span>
          </>
        )}
      </p>
    </div>
  );
};

Sort.propTypes = {
  sortContacts: PropTypes.func.isRequired,
};

export default connect(null, { sortContacts })(Sort);
