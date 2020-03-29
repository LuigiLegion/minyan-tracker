// Imports
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Component
const Notifications = ({ notifications }) => {
  return (
    <div className="col s12 m5 offset-m1">
      <div className="section">
        <div className="card grey lighten-5">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="text-style-bold">Notifications</span>
            </span>

            <ul className="notifications">
              {notifications &&
                notifications.map(curNotification => (
                  <li key={curNotification.id}>
                    <span className="text-color-blue">
                      <span className="text-style-bold">
                        {curNotification.user}
                      </span>
                    </span>

                    <span>{curNotification.content}</span>

                    <span className="text-style-bold">
                      {curNotification.congregation}
                    </span>

                    <div className="grey-text note-date">
                      {moment(curNotification.timestamp.toDate()).fromNow()}
                    </div>
                  </li>
                ))}
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
