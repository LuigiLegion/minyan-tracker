// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ShacharitCheckIn from '../check-ins/ShacharitCheckIn';
import ServicesList from './ServicesList';
import { usePrevious } from '../../utils';
import { gotPathActionCreator } from '../../store/reducers/pathReducer';
import { getShacharitCheckInStatusesThunkCreator } from '../../store/reducers/shacharitCheckInReducer';
import { getUsersShacharitAttendanceThunkCreator } from '../../store/reducers/shacharitAttendanceReducer';

// Component
const Shacharit = ({
  auth,
  profile,
  updates,
  path,
  checkIn,
  attendance,
  gotPathAction,
  getShacharitCheckInStatusesThunk,
  getUsersShacharitAttendanceThunk,
}) => {
  const prevUpdates = usePrevious(updates);
  const curPath = window.location.pathname;

  useEffect(() => {
    if (
      !updates ||
      path !== curPath ||
      (updates && prevUpdates && updates.length !== prevUpdates.length)
    ) {
      gotPathAction(curPath);
      getShacharitCheckInStatusesThunk();
      getUsersShacharitAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    path,
    curPath,
    gotPathAction,
    getShacharitCheckInStatusesThunk,
    getUsersShacharitAttendanceThunk,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <ServicesList profile={profile} attendance={attendance} />

          <ShacharitCheckIn checkIn={checkIn} />
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  updates: state.firestore.ordered.updates,
  path: state.path.path,
  checkIn: state.shacharitCheckIn,
  attendance: state.shacharitAttendance,
});

const mapDispatchToProps = dispatch => ({
  gotPathAction(path) {
    dispatch(gotPathActionCreator(path));
  },
  getShacharitCheckInStatusesThunk() {
    dispatch(getShacharitCheckInStatusesThunkCreator());
  },
  getUsersShacharitAttendanceThunk() {
    dispatch(getUsersShacharitAttendanceThunkCreator());
  },
});

// Prop Types
Shacharit.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
  path: PropTypes.string,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  gotPathAction: PropTypes.func,
  getShacharitCheckInStatusesThunk: PropTypes.func,
  getUsersShacharitAttendanceThunk: PropTypes.func,
};

// Exports
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: 'updates',
      orderBy: ['timestamp', 'desc'],
    },
  ])
)(Shacharit);
