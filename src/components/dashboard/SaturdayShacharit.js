// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const SaturdayShacharit = ({ saturday }) => {
  // console.log('saturday in SaturdayShacharit: ', attendance);

  const { going, notGoing } = saturday;

  // console.log('going in SaturdayShacharit: ', going);
  // console.log('notGoing in SaturdayShacharit: ', notGoing);

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Saturday Shacharit</span>
          </span>

          <span className="bold-text-style blue-text-color">Going</span>

          <ul className="going">
            {!going.length ? (
              <li>
                <span className="bold-text-style">None</span>
              </li>
            ) : (
              going.map(curUser => {
                const { fullName } = curUser;

                return (
                  <li key={curUser.email}>
                    <span>{fullName}</span>
                  </li>
                );
              })
            )}
          </ul>

          <hr />

          <span className="bold-text-style blue-text-color">Not Going</span>

          <ul className="not-going">
            {!notGoing.length ? (
              <li>
                <span className="bold-text-style">None</span>
              </li>
            ) : (
              notGoing.map(curUser => {
                const { fullName } = curUser;

                return (
                  <li key={curUser.email}>
                    <span>{fullName}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SaturdayShacharit;

// Prop Types
SaturdayShacharit.propTypes = {
  saturday: PropTypes.object,
};
