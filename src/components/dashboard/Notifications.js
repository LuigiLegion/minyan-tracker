// Imports
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Component
const Notifications = ({ notifications }) => {
  return (
    <div className="col s12 m5 offset-m1">
      <div className="section">
        <div className="card">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Notifications</span>
            </span>

            <ul className="notifications">
              {notifications &&
                notifications.map(curNotification => {
                  return (
                    <li key={curNotification.id}>
                      <span className="blue-text-color">
                        <span className="bold-text-style">
                          {curNotification.user}
                        </span>
                      </span>

                      <span>{curNotification.content}</span>

                      <span className="bold-text-style">
                        {curNotification.congregation}
                      </span>

                      <div className="grey-text note-date">
                        {moment(curNotification.timestamp.toDate()).fromNow()}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

// Prop Types
Notifications.propTypes = {
  notifications: PropTypes.array,
};
