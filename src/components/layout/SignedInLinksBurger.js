// Imports
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import { burgerStyles, divStyles } from '../../styles';

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
          <div styles={divStyles}>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/">
                {profile.firstName ? (
                  <span className="navbar-text-color">
                    Hello, {profile.firstName}.
                  </span>
                ) : (
                  <span className="navbar-text-color">Hello.</span>
                )}
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/placeholder">
                <span className="bold-text-style navbar-text-color">
                  Placeholder
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();

                  signOutThunk();
                }}
                to="/"
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
