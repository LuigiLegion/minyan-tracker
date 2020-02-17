// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ShacharitCheckIn from '../check-ins/ShacharitCheckIn';
import ServicesList from './ServicesList';
import { usePrevious } from '../../helpers';
import { getShacharitCheckInStatusesThunkCreator } from '../../store/reducers/shacharitCheckInReducer';
import { getUsersShacharitAttendanceThunkCreator } from '../../store/reducers/shacharitAttendanceReducer';

// Component
const Shacharit = ({
  auth,
  profile,
  updates,
  checkIn,
  attendance,
  getShacharitCheckInStatusesThunk,
  getUsersShacharitAttendanceThunk,
}) => {
  const prevUpdates = usePrevious(updates);

  useEffect(() => {
    if (
      !updates ||
      (updates && prevUpdates && updates.length !== prevUpdates.length)
    ) {
      getShacharitCheckInStatusesThunk();
      getUsersShacharitAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
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
  checkIn: state.shacharitCheckIn,
  attendance: state.shacharitAttendance,
});

const mapDispatchToProps = dispatch => ({
  getShacharitCheckInStatusesThunk() {
    dispatch(getShacharitCheckInStatusesThunkCreator());
  },
  getUsersShacharitAttendanceThunk() {
    dispatch(getUsersShacharitAttendanceThunkCreator());
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
)(Shacharit);

// Prop Types
Shacharit.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  getShacharitCheckInStatusesThunk: PropTypes.func,
  getUsersShacharitAttendanceThunk: PropTypes.func,
};
