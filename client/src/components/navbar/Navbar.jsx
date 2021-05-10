import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../images/Logo.png";

import { logout } from "../../actions/authActions";

import "./navbar.scss";

function Navbar({ auth: { isAuthenticated, loading }, logout, history }) {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__left">
        <h2>Adresar</h2>
        <img src={logo} alt="Adresar logo" />
      </Link>
      <div className="navbar__right">
        {history.location.pathname === "/contacts" && (
          <Link className="link" to="/favourites">
            Favourites
          </Link>
        )}
        {history.location.pathname === "/favourites" && (
          <Link className="link" to="/contacts">
            All
          </Link>
        )}
        {isAuthenticated && !loading ? (
          <div className="link" onClick={() => logout(history)}>
            Logout
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
