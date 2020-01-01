// Imports
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import contactUsEmail from '../../config/emailConfig';
import { burgerStyles } from '../../styles';

// Component
class SignedInLinksBurger extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { profile, signOutThunk } = this.props;

    // console.log('profile in SignedInLinksBurger: ', profile);
    // console.log('signOutThunk in SignedInLinksBurger: ', signOutThunk);

    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div className="remove-outline">
            <div>
              <NavLink to="/" onClick={() => this.closeMenu()}>
                {profile.firstName ? (
                  <span className="navbar-text-color">
                    Hello, {profile.firstName}.
                  </span>
                ) : (
                  <span className="navbar-text-color">Hello.</span>
                )}
              </NavLink>
            </div>

            {profile.isAdmin ? (
              <div>
                <NavLink to="/admin" onClick={() => this.closeMenu()}>
                  <span className="bold-text-style navbar-text-color">
                    Admin
                  </span>
                </NavLink>
              </div>
            ) : null}

            <div>
              <NavLink to="/shabbat" onClick={() => this.closeMenu()}>
                <span className="bold-text-style navbar-text-color">
                  Shabbat
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/mincha" onClick={() => this.closeMenu()}>
                <span className="bold-text-style navbar-text-color">
                  Mincha
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/maariv" onClick={() => this.closeMenu()}>
                <span className="bold-text-style navbar-text-color">
                  Maariv
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/shacharit" onClick={() => this.closeMenu()}>
                <span className="bold-text-style navbar-text-color">
                  Shacharit
                </span>
              </NavLink>
            </div>

            <div>
              <a
                href={`mailto:${contactUsEmail}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => this.closeMenu()}
              >
                <span className="bold-text-style navbar-text-color">
                  Contact Us
                </span>
              </a>
            </div>

            <div>
              <NavLink
                to="/"
                onClick={() => {
                  this.closeMenu();

                  signOutThunk();
                }}
              >
                <span className="bold-text-style navbar-text-color">
                  Sign Out
                </span>
              </NavLink>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);

// Prop Types
SignedInLinksBurger.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};
