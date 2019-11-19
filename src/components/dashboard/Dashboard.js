import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import FridayMaariv from './FridayMaariv';
import SaturdayShacharit from './SaturdayShacharit';
import Notifications from './Notifications';
import CheckIn from './CheckIn';

class Dashboard extends Component {
  render() {
    const { auth, users, notifications } = this.props;
    const fridayAttendance = { going: [], notGoing: [] };
    const saturdayAttendance = { going: [], notGoing: [] };

    let curUser;

    if (users) {
      for (let i = 0; i < users.length; i++) {
        curUser = users[i];

        if (curUser.friday) {
          fridayAttendance.going.push(curUser);
        } else {
          fridayAttendance.notGoing.push(curUser);
        }

        if (curUser.saturday) {
          saturdayAttendance.going.push(curUser);
        } else {
          saturdayAttendance.notGoing.push(curUser);
        }
      }
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <FridayMaariv attendance={fridayAttendance} />

              <SaturdayShacharit attendance={saturdayAttendance} />
            </div>

            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications} />

              <CheckIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  notifications: state.firestore.ordered.notifications,
});

export default compose(
  connect(mapStateToProps),
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
