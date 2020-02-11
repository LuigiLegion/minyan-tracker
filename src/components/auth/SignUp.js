/* eslint-disable react/button-has-type */

// Imports
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signUpThunkCreator } from '../../store/reducers/authReducer';
import signupAccessToken from '../../config/signupConfig';
import contactUsEmail from '../../config/emailConfig';

// Component
class SignUp extends PureComponent {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    congregation: 'Sons of Israel',
    accessToken: '',
    accessTokenError: false,
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { signUpThunk } = this.props;

    if (this.state.accessToken === signupAccessToken) {
      this.setState({
        accessTokenError: false,
      });
      signUpThunk(this.state);
    } else {
      this.setState({
        accessTokenError: true,
      });
    }
  };

  render() {
    const { auth, signUpAuthError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form className="card white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign Up</h5>

            <div className="input-field">
              <label htmlFor="email">
                Email<span className="red-text-color">*</span>
              </label>

              <input
                type="email"
                id="email"
                required
                autoComplete="username"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Example: cody@email.com"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">
                Password<span className="red-text-color">*</span>
              </label>

              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                title="May only contain one uppercase letter, one lowercase letter, one digit, and at least 8 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="firstName">
                First Name<span className="red-text-color">*</span>
              </label>

              <input
                type="text"
                id="firstName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters, and at least 2 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="lastName">
                Last Name<span className="red-text-color">*</span>
              </label>

              <input
                type="text"
                id="lastName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters, and at least 2 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12">
              <label htmlFor="gender">
                Gender<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="gender"
                className="browser-default"
                required
                onChange={this.handleChange}
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
                Congregation<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="congregation"
                className="browser-default"
                required
                onChange={this.handleChange}
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

            <div className="gray-text-color">
              Is your congregation not on the list?
            </div>
            <div className="gray-text-color">
              {' '}
              Contact us{' '}
              <a
                href={`mailto:${contactUsEmail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bold-text-style"
              >
                here
              </a>{' '}
              to add it!
            </div>

            <div className="input-field">
              <label htmlFor="accessToken">
                Access Token<span className="red-text-color">*</span>
              </label>

              <input
                type="text"
                id="accessToken"
                required
                title="Must
                match the access token you received via email invitation"
                onChange={this.handleChange}
              />
            </div>

            <button className="btn blue lighten-1 z-depth-0">Sign Up</button>

            <div className="red-text-color bold-text-style center">
              {signUpAuthError ? (
                <p>{signUpAuthError}</p>
              ) : this.state.accessTokenError ? (
                <p>Invalid access token! Please try again.</p>
              ) : null}
            </div>
          </form>
        </div>
      );
    }
  }
}

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  signUpAuthError: state.auth.signUpAuthError,
});

const mapDispatchToProps = dispatch => ({
  signUpThunk(newUser) {
    dispatch(signUpThunkCreator(newUser));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

// Prop Types
SignUp.propTypes = {
  auth: PropTypes.object,
  signUpAuthError: PropTypes.string,
  signUpThunk: PropTypes.func,
};
