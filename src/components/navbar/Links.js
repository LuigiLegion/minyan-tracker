// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';

// Component
const Links = ({
  isAdmin,
  firstName,
  signOutThunk
}) => {
  return (
    <ul className="right">
      <li>
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          {firstName ? `Welcome back, ${firstName}.` : 'Hello, guest.'}
        </NavLink>
      </li>

      {!firstName &&
        <>
          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/signin"
            >
              Sign In
            </NavLink>
          </li>

          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </li>
        </>
      }

      {isAdmin &&
        <li>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/admin"
          >
            Admin
          </NavLink>
        </li>
      }

      {firstName &&
        <>
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
        </>
      }

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://github.com/LuigiLegion/minyan-tracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </li>

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://github.com/LuigiLegion/minyan-tracker/blob/master/src/data/parashot.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data
        </a>
      </li>

      <li>
        <a
          className={`text-style-bold navbar-text-color${!firstName ? ' padding-right' : ''}`}
          href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </li>

      {firstName &&
        <li>
          <NavLink
            className="text-style-bold navbar-text-color padding-right"
            to="/"
            onClick={signOutThunk}
          >
            Sign Out
          </NavLink>
        </li>
      }
    </ul>
  );
};

// Container
const mapStateToProps = state => ({
  isAdmin: state.firebase.profile.isAdmin,
  firstName: state.firebase.profile.firstName,
});

const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
Links.propTypes = {
  isAdmin: PropTypes.bool,
  firstName: PropTypes.string,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
