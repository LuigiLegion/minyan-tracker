// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const Logo = () => {
  return (
    <NavLink
      className="left navbar-logo text-style-bold navbar-text-color"
      to="/"
    >
      Minyan Tracker
    </NavLink>
  )
};

// Exports
export default Logo;
