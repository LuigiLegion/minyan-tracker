// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const MondayMincha = ({ monday }) => {
  // console.log('monday in MondayMincha: ', monday);

  const { going, notGoing } = monday;

  // console.log('going in MondayMincha: ', going);
  // console.log('notGoing in MondayMincha: ', notGoing);

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Monday Mincha</span>
          </span>

          <span className="bold-text-style blue-text-color">{`Going (${going.length})`}</span>

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

                    {/* <span className="italic-text-style"> ({gender})</span> */}
                  </li>
                );
              })
            )}
          </ul>

          <hr />

          <span className="bold-text-style blue-text-color">{`Not Going (${notGoing.length})`}</span>

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

                    {/* <span className="italic-text-style"> ({gender})</span> */}
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

export default MondayMincha;

// Prop Types
MondayMincha.propTypes = {
  monday: PropTypes.object,
};
