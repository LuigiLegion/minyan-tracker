// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

import contactUsEmail from '../../config/emailConfig';

// Component
const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">
          <span className="text-style-bold navbar-text-color">
            Hello, guest.
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/signin">
          <span className="text-style-bold navbar-text-color">Sign In</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/signup">
          <span className="text-style-bold navbar-text-color">Sign Up</span>
        </NavLink>
      </li>

      <li>
        <a
          href={`mailto:${contactUsEmail}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold navbar-text-color">Contact Us</span>
        </a>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
