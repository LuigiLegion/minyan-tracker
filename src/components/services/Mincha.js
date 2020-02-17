// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import MinchaCheckIn from '../check-ins/MinchaCheckIn';
import ServicesList from './ServicesList';
import { usePrevious } from '../../helpers';
import { getMinchaCheckInStatusesThunkCreator } from '../../store/reducers/minchaCheckInReducer';
import { getUsersMinchaAttendanceThunkCreator } from '../../store/reducers/minchaAttendanceReducer';

// Component
const Mincha = ({
  auth,
  profile,
  updates,
  checkIn,
  attendance,
  getMinchaCheckInStatusesThunk,
  getUsersMinchaAttendanceThunk,
}) => {
  const prevUpdates = usePrevious(updates);

  useEffect(() => {
    if (
      !updates ||
      (updates && prevUpdates && updates.length !== prevUpdates.length)
    ) {
      getMinchaCheckInStatusesThunk();
      getUsersMinchaAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    getMinchaCheckInStatusesThunk,
    getUsersMinchaAttendanceThunk,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <ServicesList profile={profile} attendance={attendance} />

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
  checkIn: state.minchaCheckIn,
  attendance: state.minchaAttendance,
});

const mapDispatchToProps = dispatch => ({
  getMinchaCheckInStatusesThunk() {
    dispatch(getMinchaCheckInStatusesThunkCreator());
  },
  getUsersMinchaAttendanceThunk() {
    dispatch(getUsersMinchaAttendanceThunkCreator());
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
)(Mincha);

// Prop Types
Mincha.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  getMinchaCheckInStatusesThunk: PropTypes.func,
  getUsersMinchaAttendanceThunk: PropTypes.func,
};
