// Imports
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateShabbatCheckInStatusThunkCreator } from '../../store/reducers/shabbatCheckInReducer';

// Component
const ShabbatCheckIn = ({ checkIn, updateShabbatCheckInStatusThunk }) => {
  const { friday, saturday } = checkIn;

  const handleChange = event => {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    if (curCheckedVal) {
      updateShabbatCheckInStatusThunk(curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      if (changeConfirmation) {
        updateShabbatCheckInStatusThunk(curDay, false);
      }
    }
  };

  return (
    <div className="col s12 m5 offset-m1">
      <div className="section">
        <div className="card">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Check-In</span>
            </span>

            <form className="check-in-form">
              <div className="bold-text-style blue-text-color">
                Shabbat Services
              </div>

              <br />

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="friday"
                    checked={friday}
                    onChange={event => handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Friday{' '}
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
};

// Container
const mapDispatchToProps = dispatch => ({
  updateShabbatCheckInStatusThunk(day, status) {
    dispatch(updateShabbatCheckInStatusThunkCreator(day, status));
  },
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(ShabbatCheckIn);

// Prop Types
ShabbatCheckIn.propTypes = {
  checkIn: PropTypes.object,
  updateShabbatCheckInStatusThunk: PropTypes.func,
};
