// Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { resetUsersAttendanceThunkCreator } from '../../store/reducers/adminReducer';

// Component
class AdminPanel extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { users, resetUsersAttendanceThunk } = this.props;

    // console.log('users in AdminPanel handleSubmit: ', users);
    // console.log('resetUsersAttendanceThunk in AdminPanel: ', resetUsersAttendanceThunk);

    const resetConfirmation = window.confirm(
      'Are you sure you want to reset all users check-in status?'
    );

    // console.log(
    //   'resetConfirmation in AdminPanel handleSubmit: ',
    //   resetConfirmation
    // );

    if (resetConfirmation) {
      resetUsersAttendanceThunk(users);
    }
  }

  render() {
    const { auth, profile, disabled } = this.props;

    // console.log('auth in AdminPanel: ', auth);
    // console.log('profile in AdminPanel: ', profile);
    // console.log('disabled in AdminPanel: ', disabled);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else if (!profile.isAdmin) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m12">
              <div className="section">
                <div className="card z-depth-0">
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title">
                      <span className="bold-text-style">Admin Panel</span>
                    </span>

                    <form onClick={this.handleSubmit} className="custom-form">
                      <h5 className="grey-text text-darken-3">Attendance</h5>

                      <button
                        className="btn blue lighten-1 z-depth-0"
                        disabled={disabled}
                      >
                        Reset
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

// Container
const mapStateToProps = state => {
  // console.log('state in Dashboard mapStateToProps: ', state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
    disabled: state.admin.disabled,
  };
};

const mapDispatchToProps = dispatch => ({
  resetUsersAttendanceThunk(users) {
    dispatch(resetUsersAttendanceThunkCreator(users));
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
  ])
)(AdminPanel);

// Prop Types
AdminPanel.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  users: PropTypes.array,
  disabled: PropTypes.bool,
  resetUsersAttendanceThunk: PropTypes.func,
};
