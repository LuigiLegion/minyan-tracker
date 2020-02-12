// Imports
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import MinchaCheckIn from '../check-ins/MinchaCheckIn';
import ServicesList from './ServicesList';
import { getMinchaCheckInStatusesThunkCreator } from '../../store/reducers/minchaCheckInReducer';
import { getUsersMinchaAttendanceThunkCreator } from '../../store/reducers/minchaAttendanceReducer';

// Component
class Mincha extends PureComponent {
  componentDidMount() {
    this.props.getMinchaCheckInStatusesThunk();
    this.props.getUsersMinchaAttendanceThunk();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updates &&
      prevProps.updates &&
      this.props.updates.length !== prevProps.updates.length
    ) {
      this.props.getMinchaCheckInStatusesThunk();
      this.props.getUsersMinchaAttendanceThunk();
    }
  }

  render() {
    const { auth, profile, checkIn, attendance } = this.props;

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
  }
}

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
