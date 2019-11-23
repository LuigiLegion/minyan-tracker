import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Days from './Days';
// import FridayMaariv from './FridayMaariv';
// import SaturdayShacharit from './SaturdayShacharit';
import Notifications from './Notifications';
import CheckIn from './CheckIn';
import { getUserDataThunkCreator } from '../../store/reducers/userReducer';

class Dashboard extends Component {
  componentDidMount() {
    const { auth } = this.props;

    this.props.getUserDataThunk(auth.uid);
  }

  render() {
    // const { auth, users, notifications, user } = this.props;

    const { auth, notifications, user } = this.props;

    // console.log('user in Dashboard: ', user);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            {/* <div className="col s12 m6">
              <FridayMaariv attendance={fridayAttendance} />

              <SaturdayShacharit attendance={saturdayAttendance} />
            </div> */}

            <Days auth={auth} user={user} />

            <div className="col s12 m5 offset-m1">
              <CheckIn auth={auth} />

              <Notifications notifications={notifications} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  // console.log('state in Dashboard mapStateToProps: ', state);

  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    notifications: state.firestore.ordered.notifications,
    user: state.user,
    attendance: state.attendance,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserDataThunk(userId) {
    dispatch(getUserDataThunkCreator(userId));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: 'users',
    },
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc'],
    },
  ])
)(Dashboard);
