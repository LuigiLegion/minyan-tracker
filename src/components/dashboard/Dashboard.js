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
    const { auth, notifications } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <FridayMaariv />

              <SaturdayShacharit />
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
  notifications: state.firestore.ordered.notifications,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc'],
    },
  ])
)(Dashboard);
