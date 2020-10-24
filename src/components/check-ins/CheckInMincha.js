// Imports
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateMinchaCheckInStatusThunkCreator } from '../../store/reducers/minchaCheckInReducer';

// Component
const CheckInMincha = ({ checkIn, updateMinchaCheckInStatusThunk }) => {
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  } = checkIn;

  const handleChange = event => {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    if (curCheckedVal) {
      updateMinchaCheckInStatusThunk(curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );
      if (changeConfirmation) {
        updateMinchaCheckInStatusThunk(curDay, false);
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
                Mincha Services
              </div>

              <br />

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="sunday"
                    checked={sunday}
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Sunday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Monday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Tuesday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Wednesday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Thursday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                    onChange={handleChange}
                  />

                  <span className="text-color-gray">
                    {'Friday '}
                    <span className="text-style-bold text-style-italic">
                      Mincha
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
                      Mincha
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
  updateMinchaCheckInStatusThunk(day, status) {
    dispatch(updateMinchaCheckInStatusThunkCreator(day, status));
  },
});

// Prop Types
CheckInMincha.propTypes = {
  checkIn: PropTypes.object,
  updateMinchaCheckInStatusThunk: PropTypes.func,
};

// Exports
export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(CheckInMincha);
