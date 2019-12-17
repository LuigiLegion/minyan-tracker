// Imports
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import contactUsEmail from '../../config/emailConfig';
import { burgerStyles } from '../../styles';

// Component
class SignedOutLinksBurger extends Component {
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
              <NavLink
                to="/signin"
                onClick={() => {
                  this.closeMenu();
                }}
              >
                <span className="bold-text-style navbar-text-color">
                  Sign In
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/signup"
                onClick={() => {
                  this.closeMenu();
                }}
              >
                <span className="bold-text-style navbar-text-color">
                  Sign Up
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
          </div>
        </Menu>
      </div>
    );
  }
}

export default SignedOutLinksBurger;
