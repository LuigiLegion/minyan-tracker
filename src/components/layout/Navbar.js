// Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

// Component
const Navbar = ({ auth, profile }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const largeViewCheck = width > 1007;

  const updateNavbarDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateNavbarDimensions();
    window.addEventListener('resize', updateNavbarDimensions);

    return () => {
      window.removeEventListener('resize', updateNavbarDimensions);
      updateNavbarDimensions();
    };
  }, [width]);

  let curLinks;
  if (auth.uid && largeViewCheck) {
    curLinks = <SignedInLinks profile={profile} />;
  } else if (auth.uid) {
    curLinks = <SignedInLinksBurger profile={profile} />;
  } else if (largeViewCheck) {
    curLinks = <SignedOutLinks />;
  } else {
    curLinks = <SignedOutLinksBurger />;
  }

  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper navbar-padding navbar-background-color">
        <div>
          <NavLink to="/" className="left navbar-logo">
            <span className="text-style-bold navbar-text-color">
              {largeViewCheck ? 'Minyan Tracker' : 'MTracker'}
            </span>
          </NavLink>

          {curLinks}
        </div>
      </nav>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(Navbar);

// Prop Types
SignedInLinksBurger.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};
