// Imports
import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { CheckInShabbat, Services } from '..';
import {
  gotPathActionCreator,
  getShabbatCheckInStatusesThunkCreator,
  getUsersShabbatAttendanceThunkCreator,
} from '../../store';
import { usePrevious } from '../../utils';

// Component
const Shabbat = ({
  auth,
  profile,
  updates,
  path,
  checkIn,
  attendance,
  gotPathAction,
  getShabbatCheckInStatusesThunk,
  getUsersShabbatAttendanceThunk,
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
      getShabbatCheckInStatusesThunk();
      getUsersShabbatAttendanceThunk();
    }
  }, [
    updates,
    prevUpdates,
    path,
    pathname,
    gotPathAction,
    getShabbatCheckInStatusesThunk,
    getUsersShabbatAttendanceThunk,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <Services attendance={attendance} profile={profile} />

          <CheckInShabbat checkIn={checkIn} />
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
  checkIn: state.shabbatCheckIn,
  attendance: state.shabbatAttendance,
});

const mapDispatchToProps = dispatch => ({
  gotPathAction: path => dispatch(gotPathActionCreator(path)),
  getShabbatCheckInStatusesThunk: () =>
    dispatch(getShabbatCheckInStatusesThunkCreator()),
  getUsersShabbatAttendanceThunk: () =>
    dispatch(getUsersShabbatAttendanceThunkCreator()),
});

// Prop Types
Shabbat.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  gotPathAction: PropTypes.func,
  getShabbatCheckInStatusesThunk: PropTypes.func,
  getUsersShabbatAttendanceThunk: PropTypes.func,
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
)(Shabbat);
