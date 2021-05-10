import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";

import "./register.scss";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords did not match!");
    } else {
      register({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/contacts" />;
  }

  return (
    <div className="main">
      <h1>Register</h1>
      <form className="main__form" onSubmit={handleSubmit}>
        <div className="main__form__input">
          <p>Email</p>
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="main__form__input">
          <p>Password</p>
          <input
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="main__form__input">
          <p>Confirm Password</p>
          <input
            type="text"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button className="main__form__button" type="submit">
          Sign Up
        </button>
      </form>
      <p className="main__no-account">
        Already have an Account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
