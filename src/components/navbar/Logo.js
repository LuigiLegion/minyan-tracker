import React from 'react';
import { NavLink } from 'react-router-dom';

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

export default Logo;
