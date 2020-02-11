// Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ShabbatCheckIn from '../check-ins/ShabbatCheckIn';
import ServicesList from './ServicesList';
import { getShabbatCheckInStatusesThunkCreator } from '../../store/reducers/shabbatCheckInReducer';
import { getUsersShabbatAttendanceThunkCreator } from '../../store/reducers/shabbatAttendanceReducer';

// Component
class Shabbat extends Component {
  componentDidMount() {
    const {
      getShabbatCheckInStatusesThunk,
      getUsersShabbatAttendanceThunk,
    } = this.props;

    // console.log('getShabbatCheckInStatusesThunk in Shabbat: ', getShabbatCheckInStatusesThunk);
    // console.log('getUsersShabbatAttendanceThunk in Shabbat: ', getUsersShabbatAttendanceThunk);

    getShabbatCheckInStatusesThunk();
    getUsersShabbatAttendanceThunk();
  }

  render() {
    const { auth, profile, checkIn, attendance } = this.props;

    // console.log('auth in Shabbat: ', auth);
    // console.log('profile in Shabbat: ', profile);
    // console.log('checkIn in Shabbat: ', checkIn);
    // console.log('attendance in Shabbat: ', attendance);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      // getUserDataThunk(auth.uid);

      return (
        <div className="dashboard container">
          <div className="row">
            <ServicesList attendance={attendance} profile={profile} />

            <ShabbatCheckIn checkIn={checkIn} auth={auth} />
          </div>
        </div>
      );
    }
  }
}

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  updates: state.firestore.ordered.updates,
  checkIn: state.shabbatCheckIn,
  attendance: state.shabbatAttendance,
});

const mapDispatchToProps = dispatch => ({
  getShabbatCheckInStatusesThunk() {
    dispatch(getShabbatCheckInStatusesThunkCreator());
  },
  getUsersShabbatAttendanceThunk() {
    dispatch(getUsersShabbatAttendanceThunkCreator());
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
)(Shabbat);

// Prop Types
Shabbat.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  updates: PropTypes.array,
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  getShabbatCheckInStatusesThunk: PropTypes.func,
  getUsersShabbatAttendanceThunk: PropTypes.func,
};