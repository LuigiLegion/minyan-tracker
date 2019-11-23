import React from 'react';

const FridayMaariv = ({ attendance }) => {
  // console.log('FridayMaariv attendance: ', attendance);

  const { going, notGoing } = attendance;

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
