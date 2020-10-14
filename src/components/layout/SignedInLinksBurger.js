// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
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
      <div className="remove-outline">
        <div>
          <NavLink to="/" onClick={closeMenu}>
            <span className="navbar-text-color">
              {`Hello${profile.firstName ? ', ' + profile.firstName : ''}.`}
            </span>
          </NavLink>
        </div>

        {profile.isAdmin ? (
          <div>
            <NavLink to="/admin" onClick={closeMenu}>
              <span className="text-style-bold navbar-text-color">Admin</span>
            </NavLink>
          </div>
        ) : null}

        <div>
          <NavLink to="/shabbat" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Shabbat</span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/mincha" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Mincha</span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/maariv" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Maariv</span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/shacharit" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Shacharit</span>
          </NavLink>
        </div>

        <div>
          <a
            href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="text-style-bold navbar-text-color">
              Contact Us
            </span>
          </a>
        </div>

        <div>
          <NavLink
            to="/"
            onClick={() => {
              closeMenu();
              signOutThunk();
            }}
          >
            <span className="text-style-bold navbar-text-color">Sign Out</span>
          </NavLink>
        </div>
      </div>
    </Menu>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
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
