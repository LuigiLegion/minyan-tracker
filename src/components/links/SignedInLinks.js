// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li>
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          {profile.firstName ? `Welcome back, ${profile.firstName}.` : 'Hello, guest.'}
        </NavLink>
      </li>

      {profile.isAdmin ? (
        <li>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/admin"
          >
            Admin
          </NavLink>
        </li>
      ) : null}

      <li>
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/shabbat"
        >
          Shabbat
        </NavLink>
      </li>

      <li>
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/mincha"
        >
          Mincha
        </NavLink>
      </li>

      <li>
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/maariv"
        >
          Maariv
        </NavLink>
      </li>

      <li>
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/shacharit"
        >
          Shacharit
        </NavLink>
      </li>

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </li>

      <li>
        <NavLink
          className="text-style-bold navbar-text-color padding-right"
          to="/"
          onClick={signOutThunk}
        >
          Sign Out
        </NavLink>
      </li>
    </ul>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
SignedInLinks.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
