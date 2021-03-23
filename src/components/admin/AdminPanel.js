/* eslint-disable react/button-has-type */

// Imports
import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import {
  gotPathActionCreator,
  resetUsersAttendanceThunkCreator,
} from '../../store';

// Component
const AdminPanel = ({
  auth,
  profile,
  users,
  disabled,
  gotPathAction,
  resetUsersAttendanceThunk,
}) => {
  const curPath = window.location.pathname;

  useEffect(() => {
    gotPathAction(curPath);
  }, [curPath, gotPathAction]);

  const handleSubmit = event => {
    event.preventDefault();

    const resetConfirmation = window.confirm(
      'Are you sure you want to reset all users check-in status?'
    );
    if (resetConfirmation) {
      resetUsersAttendanceThunk(users);
    }
  };

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
              <div className="card grey lighten-5">
                <div className="card-content grey-text text-darken-3">
                  <span className="card-title">
                    <span className="text-style-bold">Admin Panel</span>
                  </span>

                  <form className="admin-form" onSubmit={handleSubmit}>
                    <h5 className="grey-text text-darken-3">Attendance:</h5>

                    <button
                      className="btn waves-effect waves-light blue lighten-1 admin-reset-button"
                      disabled={disabled}
                    >
                      Reset
                    </button>
                  </form>

                  <br />

                  <ul>
                    <li>
                      <NavLink to="/">
                        <span className="text-style-bold">
                          ← Back To Main Page
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  users: state.firestore.ordered.users,
  disabled: state.admin.disabled,
});

const mapDispatchToProps = dispatch => ({
  gotPathAction: path => dispatch(gotPathActionCreator(path)),
  resetUsersAttendanceThunk: users =>
    dispatch(resetUsersAttendanceThunkCreator(users)),
});

// Prop Types
AdminPanel.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  users: PropTypes.array,
  disabled: PropTypes.bool,
  gotPathAction: PropTypes.func,
  resetUsersAttendanceThunk: PropTypes.func,
};

// Exports
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
