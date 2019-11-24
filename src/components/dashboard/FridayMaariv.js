// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const FridayMaariv = ({ friday }) => {
  // console.log('friday in FridayMaariv: ', attendance);

  const { going, notGoing } = friday;
  // console.log('going in FridayMaariv: ', going);
  // console.log('notGoing in FridayMaariv: ', notGoing);

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Friday Maariv</span>
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

export default FridayMaariv;

// Prop Types
FridayMaariv.propTypes = {
  friday: PropTypes.object,
};
