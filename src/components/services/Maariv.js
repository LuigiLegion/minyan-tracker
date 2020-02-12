// Imports
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import MaarivCheckIn from '../check-ins/MaarivCheckIn';
import ServicesList from './ServicesList';
import { getMaarivCheckInStatusesThunkCreator } from '../../store/reducers/maarivCheckInReducer';
import { getUsersMaarivAttendanceThunkCreator } from '../../store/reducers/maarivAttendanceReducer';

// Component
class Maariv extends PureComponent {
  componentDidMount() {
    this.props.getMaarivCheckInStatusesThunk();
    this.props.getUsersMaarivAttendanceThunk();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updates &&
      prevProps.updates &&
      this.props.updates.length !== prevProps.updates.length
    ) {
      this.props.getMaarivCheckInStatusesThunk();
      this.props.getUsersMaarivAttendanceThunk();
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

            <MaarivCheckIn checkIn={checkIn} auth={auth} />
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
  checkIn: state.maarivCheckIn,
  attendance: state.maarivAttendance,
});

const mapDispatchToProps = dispatch => ({
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
  checkIn: PropTypes.object,
  attendance: PropTypes.object,
  getMaarivCheckInStatusesThunk: PropTypes.func,
  getUsersMaarivAttendanceThunk: PropTypes.func,
};
