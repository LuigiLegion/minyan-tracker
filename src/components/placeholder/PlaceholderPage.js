// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

// Component
const PlaceholderPage = ({ auth }) => {
  // console.log('auth in PlaceholderPage: ', auth);

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
                    <span className="bold-text-style">Placeholder</span>
                  </span>

                  <ul className="placeholder">
                    <li>
                      <span>This is a placeholder page.</span>
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

export default compose(connect(mapStateToProps))(PlaceholderPage);

// Prop Types
PlaceholderPage.propTypes = {
  auth: PropTypes.object,
};
