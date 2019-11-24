// Imports
import React from 'react';
import PropTypes from 'prop-types';

import CheckIn from './CheckIn';
import Notifications from './Notifications';

// Component
const Utilities = ({ auth, notifications }) => {
  // console.log('auth in Utilities: ', auth);
  // console.log('notifications in Utilities: ', notifications);

  return (
    <div className="col s12 m5 offset-m1">
      <CheckIn auth={auth} />

      <Notifications notifications={notifications} />
    </div>
  );
};

export default Utilities;

// Prop Types
Utilities.propTypes = {
  auth: PropTypes.object,
  notifications: PropTypes.array,
};
