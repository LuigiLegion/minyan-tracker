// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const Notification = ({ user, content, congregation, timestamp }) => {
  return (
    <li>
      <span className="text-style-bold text-color-blue">{user}</span>

      <span>{content}</span>

      <span className="text-style-bold">{congregation}</span>

      <div className="grey-text">{moment(timestamp.toDate()).fromNow()}</div>
    </li>
  );
};

// Prop Types
Notification.propTypes = {
  user: PropTypes.string,
  content: PropTypes.string,
  congregation: PropTypes.string,
  timestamp: PropTypes.object,
};

// Exports
export default Notification;
