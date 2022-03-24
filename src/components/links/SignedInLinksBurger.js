// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';
import { burgerStyles } from '../../styles';

// Component
const SignedInLinksBurger = ({ profile, signOutThunk }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Menu
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      <div className="outline-none">
        <div className="welcome-back-container">
          <NavLink
            className="navbar-text-color"
            to="/"
            onClick={closeMenu}
          >
            <div className="white-space-pre line-height-reset">
              {profile.firstName ? `Welcome back,\n${profile.firstName}.` : 'Hello, guest.'}
            </div>
          </NavLink>
        </div>

        {profile.isAdmin ? (
          <div>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/admin"
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          </div>
        ) : null}

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/shabbat"
            onClick={closeMenu}
          >
            Shabbat
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/mincha"
            onClick={closeMenu}
          >
            Mincha
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/maariv"
            onClick={closeMenu}
          >
            Maariv
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/shacharit"
            onClick={closeMenu}
          >
            Shacharit
          </NavLink>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contact Us
          </a>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/"
            onClick={() => {
              closeMenu();
              signOutThunk();
            }}
          >
            Sign Out
          </NavLink>
        </div>
      </div>
    </Menu>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
SignedInLinksBurger.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);
