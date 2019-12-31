// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateMaarivCheckInStatusThunkCreator } from '../../store/reducers/maarivCheckInReducer';

// Component
class MaarivCheckIn extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.checked in MaarivCheckIn handleChange: ', event.target.checked);
    // console.log('event.target.value in MaarivCheckIn handleChange: ', event.target.value);

    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const { auth, updateMaarivCheckInStatusThunk } = this.props;

    // console.log('auth in MaarivCheckIn: ', auth);
    // console.log('updateMaarivCheckInStatusThunk in MaarivCheckIn: ', updateMaarivCheckInStatusThunk);

    if (curCheckedVal) {
      updateMaarivCheckInStatusThunk(auth.uid, curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      // console.log('changeConfirmation in MaarivCheckIn handleSubmit: ', changeConfirmation);

      if (changeConfirmation) {
        updateMaarivCheckInStatusThunk(auth.uid, curDay, false);
      }
    }
  }

  render() {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      saturday,
    } = this.props.checkIn;

    // console.log('sunday in MaarivCheckIn: ', sunday);
    // console.log('monday in MaarivCheckIn: ', monday);
    // console.log('tuesday in MaarivCheckIn: ', tuesday);
    // console.log('wednesday in MaarivCheckIn: ', wednesday);
    // console.log('thursday in MaarivCheckIn: ', thursday);
    // console.log('saturday in MaarivCheckIn: ', saturday);

    return (
      <div className="col s12 m5 offset-m1">
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <span className="card-title">
                <span className="bold-text-style">Check-In</span>
              </span>

              <form className="check-in-form">
                <div className="bold-text-style blue-text-color">
                  Maariv Services
                </div>

                <br />

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="sunday"
                      checked={sunday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Sunday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="monday"
                      checked={monday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Monday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="tuesday"
                      checked={tuesday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Tuesday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="wednesday"
                      checked={wednesday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Wednesday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="thursday"
                      checked={thursday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Thursday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="saturday"
                      checked={saturday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Saturday{' '}
                      <span className="bold-text-style italic-text-style">
                        Maariv
                      </span>
                    </span>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Container
const mapDispatchToProps = dispatch => ({
  updateMaarivCheckInStatusThunk(userId, day, status) {
    dispatch(updateMaarivCheckInStatusThunkCreator(userId, day, status));
  },
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(MaarivCheckIn);

// Prop Types
MaarivCheckIn.propTypes = {
  auth: PropTypes.object,
  checkIn: PropTypes.object,
  updateMaarivCheckInStatusThunk: PropTypes.func,
};
