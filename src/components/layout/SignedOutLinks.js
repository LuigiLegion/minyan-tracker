import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signin">
          <span className="bold-text-style navbar-text-color">Sign In</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/signup">
          <span className="bold-text-style navbar-text-color">Sign Up</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
