// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import contactUsEmail from '../../config/emailConfig';
import { burgerStyles } from '../../styles';

// Component
const SignedOutLinksBurger = () => {
  const { menuOpen, setMenuOpen } = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <Menu
        isOpen={menuOpen}
        onStateChange={state => handleStateChange(state)}
        right
        width="50%"
        styles={burgerStyles}
      >
        <div className="remove-outline">
          <div>
            <NavLink
              to="/signin"
              onClick={() => {
                closeMenu();
              }}
            >
              <span className="bold-text-style navbar-text-color">Sign In</span>
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/signup"
              onClick={() => {
                closeMenu();
              }}
            >
              <span className="bold-text-style navbar-text-color">Sign Up</span>
            </NavLink>
          </div>

          <div>
            <a
              href={`mailto:${contactUsEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => closeMenu()}
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
};

export default SignedOutLinksBurger;
