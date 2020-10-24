// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const Service = ({ service }) => {
  const { day, type, going, notGoing } = service;

  return (
    <div className="section">
      <div className="card grey lighten-5">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="text-style-bold">{`${day} ${type}`}</span>
          </span>

          <span className="text-style-bold text-color-blue">{`Going (${going.length})`}</span>

          <ul className="going">
            {!going.length ? (
              <li>
                <span className="text-style-bold">None</span>
              </li>
            ) : (
              going.map(curUser => (
                <li key={curUser.email}>
                  <span>{curUser.fullName}</span>

                  {/* <span className="text-style-italic"> ({gender})</span> */}
                </li>
              ))
            )}
          </ul>

          <hr />

          <span className="text-style-bold text-color-blue">{`Not Going (${notGoing.length})`}</span>

          <ul className="not-going">
            {!notGoing.length ? (
              <li>
                <span className="text-style-bold">None</span>
              </li>
            ) : (
              notGoing.map(curUser => (
                <li key={curUser.email}>
                  <span>{curUser.fullName}</span>

                  {/* <span className="text-style-italic"> ({gender})</span> */}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Prop Types
Service.propTypes = {
  service: PropTypes.object,
};

// Exports
export default Service;
