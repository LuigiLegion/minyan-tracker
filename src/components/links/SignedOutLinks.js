// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          Hello, guest.
        </NavLink>
      </li>

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

      <li>
        <a
          className="text-style-bold navbar-text-color padding-right"
          href={`mailto:${process.env.REACT_APP_CONTACT_US_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </li>
    </ul>
  );
};

// Exports
export default SignedOutLinks;
