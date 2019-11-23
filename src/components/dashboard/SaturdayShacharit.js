import React from 'react';

const SaturdayShacharit = ({ attendance }) => {
  // console.log('SaturdayShacharit attendance: ', attendance);

  const { going, notGoing } = attendance;

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <span className="bold-text-style">Saturday Shacharit</span>
          </span>

          <span className="bold-text-style blue-text-color">Going</span>

          <ul className="going">
            {going &&
              going.map(curUser => {
                const { fullName } = curUser;

                return (
                  <li key={curUser.email}>
                    <span>{fullName}</span>
                  </li>
                );
              })}
          </ul>

          <hr />

          <span className="bold-text-style blue-text-color">Not Going</span>

          <ul className="not-going">
            {notGoing &&
              notGoing.map(curUser => {
                const { fullName } = curUser;

                return (
                  <li key={curUser.email}>
                    <span>{fullName}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SaturdayShacharit;
