// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Welcome, Notifications } from '..';
import { gotPathActionCreator, getUserDataThunkCreator } from '../../store';

// Component
const Dashboard = ({
  auth,
  notifications,
  gotPathAction,
  getUserDataThunk,
}) => {
  const curPath = window.location.pathname;

  useEffect(() => {
    if (auth.uid) {
      gotPathAction(curPath);
      getUserDataThunk(auth.uid);
    }
  }, [auth, curPath, gotPathAction, getUserDataThunk]);

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
  gotPathAction: path => dispatch(gotPathActionCreator(path)),
  getUserDataThunk: userId => dispatch(getUserDataThunkCreator(userId)),
});

// Prop Types
Dashboard.propTypes = {
  auth: PropTypes.object,
  notifications: PropTypes.array,
  gotPathAction: PropTypes.func,
  getUserDataThunk: PropTypes.func,
};

// Exports
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
