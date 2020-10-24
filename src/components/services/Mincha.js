// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import MinchaCheckIn from '../check-ins/MinchaCheckIn';
import Services from './Services';
import { usePrevious } from '../../utils';
import { gotPathActionCreator } from '../../store/reducers/pathReducer';
import { getMinchaCheckInStatusesThunkCreator } from '../../store/reducers/minchaCheckInReducer';
import { getUsersMinchaAttendanceThunkCreator } from '../../store/reducers/minchaAttendanceReducer';

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
  const curPath = window.location.pathname;

  useEffect(() => {
    if (
      !updates ||
      path !== curPath ||
      (updates && prevUpdates && updates.length !== prevUpdates.length)
    ) {
      gotPathAction(curPath);
      getMinchaCheckInStatusesThunk();
      getUsersMinchaAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    path,
    curPath,
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

          <MinchaCheckIn checkIn={checkIn} />
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
  gotPathAction(path) {
    dispatch(gotPathActionCreator(path));
  },
  getMinchaCheckInStatusesThunk() {
    dispatch(getMinchaCheckInStatusesThunkCreator());
  },
  getUsersMinchaAttendanceThunk() {
    dispatch(getUsersMinchaAttendanceThunkCreator());
  },
});

// Prop Types
Mincha.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
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
