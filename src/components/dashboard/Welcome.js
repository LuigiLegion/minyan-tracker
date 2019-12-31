// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component
const Welcome = props => {
  // console.log('props in Welcome: ', props);

  return (
    <div className="col s12 m6">
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Placeholder</span>
            </span>

            <span className="bold-text-style blue-text-color">Placeholder</span>

            <ul className="placeholder">
              <li>
                <span className="bold-text-style">Placeholder</span>
              </li>
            </ul>

            <ul>
              <li>
                <NavLink to="/shabbat">
                  <span className="bold-text-style">Shabbat Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/mincha">
                  <span className="bold-text-style">Mincha Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/maariv">
                  <span className="bold-text-style">Maariv Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/shacharit">
                  <span className="bold-text-style">Shacharit Services</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

// Prop Types
Welcome.propTypes = {
  props: PropTypes.object,
};
