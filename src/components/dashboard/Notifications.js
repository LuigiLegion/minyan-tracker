// Imports
import React from 'react';
import PropTypes from 'prop-types';

import { Notification } from '..';

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
                notifications.map(notification => (
                  <Notification
                    key={notification.id}
                    user={notification.user}
                    content={notification.content}
                    congregation={notification.congregation}
                    timestamp={notification.timestamp}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop Types
Notifications.propTypes = {
  notifications: PropTypes.array,
};

// Exports
export default Notifications;
