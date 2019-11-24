// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Days from './Days';
import Utilities from './Utilities';
import { getUserDataThunkCreator } from '../../store/reducers/userReducer';

// Component
const Dashboard = ({ auth, notifications, getUserDataThunk }) => {
  // console.log('auth in Dashboard: ', auth);
  // console.log('notifications in Dashboard: ', notifications);
  // console.log('getUserDataThunk in Dashboard: ', getUserDataThunk);

  getUserDataThunk(auth.uid);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <Days />

          <Utilities auth={auth} notifications={notifications} />
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => {
  // console.log('state in Dashboard mapStateToProps: ', state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
    notifications: state.firestore.ordered.notifications,
  };
};

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
      collection: 'users',
    },
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc'],
    },
  ])
)(Dashboard);

// Prop Types
Days.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  notifications: PropTypes.array,
  getUserDataThunk: PropTypes.func,
};
