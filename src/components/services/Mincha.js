// Imports
import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { CheckInMincha, Services } from '..';
import {
  gotPathActionCreator,
  getMinchaCheckInStatusesThunkCreator,
  getUsersMinchaAttendanceThunkCreator,
} from '../../store';
import { usePrevious } from '../../utils';

// Component
const Mincha = ({
  auth,
  profile,
  updates,
  path,
  checkIn,
  attendance,
  gotPathAction,
  getMinchaCheckInStatusesThunk,
  getUsersMinchaAttendanceThunk,
}) => {
  const prevUpdates = usePrevious(updates);
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !updates ||
      path !== pathname ||
      (updates && prevUpdates && updates.length !== prevUpdates.length)
    ) {
      gotPathAction(pathname);
      getMinchaCheckInStatusesThunk();
      getUsersMinchaAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    path,
    pathname,
    gotPathAction,
    getMinchaCheckInStatusesThunk,
    getUsersMinchaAttendanceThunk,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <Services profile={profile} attendance={attendance} />

          <CheckInMincha checkIn={checkIn} />
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
  checkIn: state.minchaCheckIn,
  attendance: state.minchaAttendance,
});

const mapDispatchToProps = dispatch => ({
  gotPathAction: path => dispatch(gotPathActionCreator(path)),
  getMinchaCheckInStatusesThunk: () =>
    dispatch(getMinchaCheckInStatusesThunkCreator()),
  getUsersMinchaAttendanceThunk: () =>
    dispatch(getUsersMinchaAttendanceThunkCreator()),
});

// Prop Types
Mincha.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  gotPathAction: PropTypes.func,
  getMinchaCheckInStatusesThunk: PropTypes.func,
  getUsersMinchaAttendanceThunk: PropTypes.func,
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
)(Mincha);
