// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { parashot } from '../../data/parashot.json';
const hebrewWeekOfYear = moment().week() + 10;

// Component
const Welcome = () => {
  return (
    <div className="col s12 m6">
      <div className="section">
        <div className="card">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Services</span>
            </span>

            <span className="bold-text-style">This Week's Parasha: </span>

            <span className="italic-text-style">
              {parashot[hebrewWeekOfYear - 1]}
            </span>

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
