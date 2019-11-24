// Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signInThunkCreator } from '../../store/reducers/authReducer';

// Component
export class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.id in SignIn handleChange: ', event.target.id);
    // console.log('event.target.value in SignIn handleChange: ', event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { signInThunk } = this.props;

    // console.log('signInThunk in SignIn handleSubmit: ', signInThunk);

    signInThunk(this.state);
  }

  render() {
    const { auth, authError } = this.props;

    // console.log('auth in SignIn: ', auth);
    // console.log('authError in SignIn: ', authError);

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Sign In</h5>

            <div className="input-field">
              <label htmlFor="email">
                Email<span className="red-text-color">*</span>
              </label>

              <input
                type="email"
                id="email"
                required
                autoComplete="username"
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
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <button className="btn blue lighten-1 z-depth-0">Sign In</button>
            </div>

            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
      );
    }
  }
}

// Container
const mapStateToProps = state => {
  // console.log('state in SignIn mapStateToProps: ', state);

  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => ({
  signInThunk(userCredentials) {
    dispatch(signInThunkCreator(userCredentials));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

// Prop Types
SignIn.propTypes = {
  auth: PropTypes.object,
  authError: PropTypes.string,
  signInThunk: PropTypes.func,
};
