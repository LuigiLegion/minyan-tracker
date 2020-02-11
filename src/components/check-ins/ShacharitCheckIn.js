// Imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateShacharitCheckInStatusThunkCreator } from '../../store/reducers/shacharitCheckInReducer';

// Component
class ShacharitCheckIn extends PureComponent {
  handleChange = event => {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const { auth, updateShacharitCheckInStatusThunk } = this.props;

    if (curCheckedVal) {
      updateShacharitCheckInStatusThunk(auth.uid, curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      if (changeConfirmation) {
        updateShacharitCheckInStatusThunk(auth.uid, curDay, false);
      }
    }
  };

  render() {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    } = this.props.checkIn;

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
                  Shacharit Services
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
                        Shacharit
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
                        Shacharit
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
                        Shacharit
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
                        Shacharit
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
                        Shacharit
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="friday"
                      checked={friday}
                      onChange={event => this.handleChange(event)}
                    />

                    <span className="gray-text-color">
                      Friday{' '}
                      <span className="bold-text-style italic-text-style">
                        Shacharit
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
  updateShacharitCheckInStatusThunk(userId, day, status) {
    dispatch(updateShacharitCheckInStatusThunkCreator(userId, day, status));
  },
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(ShacharitCheckIn);

// Prop Types
ShacharitCheckIn.propTypes = {
  auth: PropTypes.object,
  checkIn: PropTypes.object,
  updateShacharitCheckInStatusThunk: PropTypes.func,
};
