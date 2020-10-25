// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">
          <span className="navbar-text-color">
            {`Hello${profile.firstName ? ', ' + profile.firstName : ''}.`}
          </span>
        </NavLink>
      </li>

      {profile.isAdmin ? (
        <li>
          <NavLink to="/admin">
            <span className="text-style-bold navbar-text-color">Admin</span>
          </NavLink>
        </li>
      ) : null}

      <li>
        <NavLink to="/shabbat">
          <span className="text-style-bold navbar-text-color">Shabbat</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/mincha">
          <span className="text-style-bold navbar-text-color">Mincha</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/maariv">
          <span className="text-style-bold navbar-text-color">Maariv</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/shacharit">
          <span className="text-style-bold navbar-text-color">Shacharit</span>
        </NavLink>
      </li>

      <li>
        <a
          href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold navbar-text-color">Contact Us</span>
        </a>
      </li>

      <li>
        <NavLink to="/" onClick={signOutThunk}>
          <span className="text-style-bold navbar-text-color">Sign Out</span>
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
