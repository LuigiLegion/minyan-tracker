// Imports
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateMaarivCheckInStatusThunkCreator } from '../../store/reducers/maarivCheckInReducer';

// Component
const MaarivCheckIn = ({ checkIn, updateMaarivCheckInStatusThunk }) => {
  const { sunday, monday, tuesday, wednesday, thursday, saturday } = checkIn;

  const handleChange = event => {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    if (curCheckedVal) {
      updateMaarivCheckInStatusThunk(curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      if (changeConfirmation) {
        updateMaarivCheckInStatusThunk(curDay, false);
      }
    }
  };

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
                    onChange={event => handleChange(event)}
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
                    onChange={event => handleChange(event)}
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
                    onChange={event => handleChange(event)}
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
                    onChange={event => handleChange(event)}
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
                    onChange={event => handleChange(event)}
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
                    onChange={event => handleChange(event)}
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
};

// Container
const mapDispatchToProps = dispatch => ({
  updateMaarivCheckInStatusThunk(day, status) {
    dispatch(updateMaarivCheckInStatusThunkCreator(day, status));
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
  checkIn: PropTypes.object,
  updateMaarivCheckInStatusThunk: PropTypes.func,
};
