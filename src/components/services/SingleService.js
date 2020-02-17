// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const SingleService = ({ service }) => {
  const { day, type, going, notGoing } = service;

  return (
    <div className="section">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">{`${day} ${type}`}</span>
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

export default SingleService;

// Prop Types
SingleService.propTypes = {
  service: PropTypes.object,
};
