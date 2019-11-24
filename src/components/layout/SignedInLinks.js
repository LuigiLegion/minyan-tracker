// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  // console.log('profile in SignedInLinks: ', profile);
  // console.log('signOutThunk in SignedInLinks: ', signOutThunk);

  return (
    <ul className="right">
      <li>
        <NavLink to="/">
          {profile.firstName ? (
            <span className="navbar-text-color">
              Hello, {profile.firstName}.
            </span>
          ) : (
            <span className="navbar-text-color">Hello.</span>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/placeholder">
          <span className="bold-text-style navbar-text-color">Placeholder</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={signOutThunk}>
          <span className="bold-text-style navbar-text-color">Sign Out</span>
        </NavLink>
      </li>
    </ul>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);

// Prop Types
SignedInLinks.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};
