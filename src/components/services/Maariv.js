// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import MaarivCheckIn from '../check-ins/MaarivCheckIn';
import ServicesList from './ServicesList';
import { usePrevious } from '../../helpers';
import { gotPathActionCreator } from '../../store/reducers/pathReducer';
import { getMaarivCheckInStatusesThunkCreator } from '../../store/reducers/maarivCheckInReducer';
import { getUsersMaarivAttendanceThunkCreator } from '../../store/reducers/maarivAttendanceReducer';

// Component
const Maariv = ({
  auth,
  profile,
  updates,
  path,
  checkIn,
  attendance,
  gotPathAction,
  getMaarivCheckInStatusesThunk,
  getUsersMaarivAttendanceThunk,
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
      getMaarivCheckInStatusesThunk();
      getUsersMaarivAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    path,
    curPath,
    gotPathAction,
    getMaarivCheckInStatusesThunk,
    getUsersMaarivAttendanceThunk,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <ServicesList profile={profile} attendance={attendance} />

          <MaarivCheckIn checkIn={checkIn} />
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
  checkIn: state.maarivCheckIn,
  attendance: state.maarivAttendance,
});

const mapDispatchToProps = dispatch => ({
  gotPathAction(path) {
    dispatch(gotPathActionCreator(path));
  },
  getMaarivCheckInStatusesThunk() {
    dispatch(getMaarivCheckInStatusesThunkCreator());
  },
  getUsersMaarivAttendanceThunk() {
    dispatch(getUsersMaarivAttendanceThunkCreator());
  },
});

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
)(Maariv);

// Prop Types
Maariv.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
  path: PropTypes.string,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  gotPathAction: PropTypes.func,
  getMaarivCheckInStatusesThunk: PropTypes.func,
  getUsersMaarivAttendanceThunk: PropTypes.func,
};
