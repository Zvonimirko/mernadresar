import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

import "./dashboard.scss";

const Dashboard = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/contacts" />;
  }

  return (
    <div className="main">
      <h1>Log In</h1>
      <form action="" className="main__form" onSubmit={handleSubmit}>
        <div className="main__form__input">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="main__form__input">
          <p>Password</p>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button className="main__form__button" type="submit">
          Log In
        </button>
      </form>
      <p className="main__no-account">
        No Account? Feel free to <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

Dashboard.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  login: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { login })(Dashboard);
