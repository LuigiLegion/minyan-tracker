// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

// Component
const AdminPanel = ({ auth }) => {
  // console.log('auth in AdminPanel: ', auth);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12">
            <div className="section">
              <div className="card z-depth-0">
                <div className="card-content grey-text text-darken-3">
                  <span className="card-title">
                    <span className="bold-text-style">Reset Attendance</span>
                  </span>

                  <ul className="placeholder">
                    <li>
                      <span>Reset Button</span>
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
const mapStateToProps = state => {
  // console.log('state in Dashboard mapStateToProps: ', state);

  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps))(AdminPanel);

// Prop Types
AdminPanel.propTypes = {
  auth: PropTypes.object,
};
