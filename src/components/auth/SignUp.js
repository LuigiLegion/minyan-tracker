/* eslint-disable react/button-has-type */

// Imports
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signUpThunkCreator } from '../../store/reducers/authReducer';

// Component
const SignUp = ({ auth, signUpError, signUpThunk }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    congregation: 'Sons of Israel',
    accessToken: '',
    accessTokenError: false,
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (state.accessToken === process.env.REACT_APP_SIGNUP_ACCESS_TOKEN) {
      setState({
        ...state,
        accessTokenError: false,
      });
      signUpThunk(state);
    } else {
      setState({
        ...state,
        accessTokenError: true,
      });
    }
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <form className="card grey lighten-5" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>

          <div className="input-field">
            <label htmlFor="email">
              Email<span className="text-color-red">*</span>
            </label>

            <input
              type="email"
              id="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Example: cody@email.com"
              autoComplete="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">
              Password<span className="text-color-red">*</span>
            </label>

            <input
              type="password"
              id="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
              title="May only contain one uppercase letter, one lowercase letter, one digit, and at least 8 characters in total"
              autoComplete="password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="firstName">
              First Name<span className="text-color-red">*</span>
            </label>

            <input
              type="text"
              id="firstName"
              pattern="[A-Za-z]{2,32}"
              title="May only contain uppercase and lowercase letters, and at least 2 characters in total"
              autoComplete="first-name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">
              Last Name<span className="text-color-red">*</span>
            </label>

            <input
              type="text"
              id="lastName"
              pattern="[A-Za-z]{2,32}"
              title="May only contain uppercase and lowercase letters, and at least 2 characters in total"
              autoComplete="last-name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="gender">
              Gender<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              className="browser-default"
              id="gender"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-field col s12">
            <label htmlFor="congregation">
              Congregation<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              className="browser-default"
              id="congregation"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="Sons of Israel">Sons of Israel</option>
              <option value="Young Israel of Sunnyside">
                Young Israel of Sunnyside
              </option>
              <option value="Chabad of West Queens">
                Chabad of West Queens
              </option>
              <option value="Astoria Center of Israel">
                Astoria Center of Israel
              </option>
              <option value="Faculty of Agriculture">
                Faculty of Agriculture
              </option>
            </select>
          </div>

          <div className="text-color-gray">
            Is your congregation not on the list?
          </div>
          <div className="text-color-gray">
            {' Contact us '}
            <a
              className="text-style-bold"
              href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            {' to add it! '}
          </div>

          <div className="input-field">
            <label htmlFor="accessToken">
              Access Token<span className="text-color-red">*</span>
            </label>

            <input
              type="text"
              id="accessToken"
              title="Must match the access token you received via email invitation"
              autoComplete="access-token"
              required
              onChange={handleChange}
            />
          </div>

          <button className="btn waves-effect waves-light blue lighten-1">
            Sign Up
          </button>

          <div className="text-color-red text-style-bold center">
            {signUpError ? (
              <div>{signUpError}</div>
            ) : state.accessTokenError ? (
              <div>Invalid access token! Please try again.</div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  signUpError: state.auth.signUpError,
});

const mapDispatchToProps = dispatch => ({
  signUpThunk(newUser) {
    dispatch(signUpThunkCreator(newUser));
  },
});

// Prop Types
SignUp.propTypes = {
  auth: PropTypes.object,
  signUpError: PropTypes.string,
  signUpThunk: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
