// Imports
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateShabbatCheckInStatusThunkCreator } from '../../store';

// Component
const CheckInShabbat = ({ checkIn, updateShabbatCheckInStatusThunk }) => {
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
        <div className="card grey lighten-5">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="text-style-bold">Check-In</span>
            </span>

            <form className="check-in-form">
              <div className="text-style-bold text-color-blue">
                Shabbat Services
              </div>

              <br />

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="friday"
                    checked={friday}
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Friday '}
                    <span className="text-style-bold text-style-italic">
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Saturday '}
                    <span className="text-style-bold text-style-italic">
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
  updateShabbatCheckInStatusThunk: (day, status) =>
    dispatch(updateShabbatCheckInStatusThunkCreator(day, status)),
});

// Prop Types
CheckInShabbat.propTypes = {
  checkIn: PropTypes.object,
  updateShabbatCheckInStatusThunk: PropTypes.func,
};

// Exports
export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(CheckInShabbat);
