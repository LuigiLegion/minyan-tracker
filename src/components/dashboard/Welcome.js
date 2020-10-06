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
        <div className="card grey lighten-5">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="text-style-bold">Services</span>
            </span>

            <span className="text-style-bold">This Week's Parasha: </span>

            <span className="text-style-italic">
              {parashot[hebrewWeekOfYear - 1]}
            </span>

            <ul>
              <li>
                <NavLink to="/shabbat">
                  <span className="text-style-bold">Shabbat Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/mincha">
                  <span className="text-style-bold">Mincha Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/maariv">
                  <span className="text-style-bold">Maariv Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/shacharit">
                  <span className="text-style-bold">Shacharit Services</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exports
export default Welcome;
