// Imports
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ShacharitCheckIn from '../check-ins/ShacharitCheckIn';
import ServicesList from './ServicesList';
import { getShacharitCheckInStatusesThunkCreator } from '../../store/reducers/shacharitCheckInReducer';
import { getUsersShacharitAttendanceThunkCreator } from '../../store/reducers/shacharitAttendanceReducer';

// Component
class Shacharit extends PureComponent {
  componentDidMount() {
    const {
      getShacharitCheckInStatusesThunk,
      getUsersShacharitAttendanceThunk,
    } = this.props;

    getShacharitCheckInStatusesThunk();
    getUsersShacharitAttendanceThunk();
  }

  render() {
    const { auth, profile, checkIn, attendance } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      // getUserDataThunk(auth.uid);

      return (
        <div className="dashboard container">
          <div className="row">
            <ServicesList profile={profile} attendance={attendance} />

            <ShacharitCheckIn checkIn={checkIn} auth={auth} />
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
