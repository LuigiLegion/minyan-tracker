// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Welcome from './Welcome';
import Notifications from './Notifications';
import { getUserDataThunkCreator } from '../../store/reducers/userReducer';

// Component
const Dashboard = ({ auth, notifications, getUserDataThunk }) => {
  // eslint-disable-next-line
  useEffect(() => getUserDataThunk(auth.uid), []);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <Welcome />

          <Notifications notifications={notifications} />
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications,
});

const mapDispatchToProps = dispatch => ({
  getUserDataThunk(userId) {
    dispatch(getUserDataThunkCreator(userId));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: 'notifications',
      limit: 10,
      orderBy: ['timestamp', 'desc'],
    },
  ])
)(Dashboard);

// Prop Types
Dashboard.propTypes = {
  auth: PropTypes.object,
  notifications: PropTypes.array,
  getUserDataThunk: PropTypes.func,
};
