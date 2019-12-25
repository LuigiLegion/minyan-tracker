// Imports
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

// Component
class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { auth, profile } = this.props;

    // console.log('auth in Navbar: ', auth);
    // console.log('profile in Navbar: ', profile);

    const largeViewCheck = this.state.width > 1007;
    let curLinks;

    if (auth.uid) {
      if (largeViewCheck) {
        curLinks = <SignedInLinks profile={profile} />;
      } else {
        curLinks = <SignedInLinksBurger profile={profile} />;
      }
    } else if (largeViewCheck) {
      curLinks = <SignedOutLinks />;
    } else {
      curLinks = <SignedOutLinksBurger />;
    }

    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper navbar-background-color">
          <div>
            <NavLink to="/" className="left brand-logo navbar-logo">
              <span className="bold-text-style navbar-text-color">
                {largeViewCheck ? 'Minyan Tracker' : 'MTracker'}
              </span>
            </NavLink>

            {curLinks}
          </div>
        </nav>
      </div>
    );
  }
}

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
