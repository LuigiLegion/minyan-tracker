// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateShabbatCheckInStatusThunkCreator } from '../../store/reducers/shabbatCheckInReducer';

// Component
class ShabbatCheckIn extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.checked in ShabbatCheckIn handleChange: ', event.target.checked);
    // console.log('event.target.value in ShabbatCheckIn handleChange: ', event.target.value);

    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const { auth, updateShabbatCheckInStatusThunk } = this.props;

    // console.log('auth in ShabbatCheckIn: ', auth);
    // console.log('updateShabbatCheckInStatusThunk in ShabbatCheckIn: ', updateShabbatCheckInStatusThunk);

    if (curCheckedVal) {
      updateShabbatCheckInStatusThunk(auth.uid, curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      // console.log('changeConfirmation in ShabbatCheckIn handleSubmit: ', changeConfirmation);

      if (changeConfirmation) {
        updateShabbatCheckInStatusThunk(auth.uid, curDay, false);
      }
    }
  }

  render() {
    const { friday, saturday } = this.props.checkIn;

    // console.log('friday in ShabbatCheckIn: ', friday);
    // console.log('saturday in ShabbatCheckIn: ', saturday);

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
                  Shabbat Services
                </div>

                <br />

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
  updateShabbatCheckInStatusThunk(userId, day, status) {
    dispatch(updateShabbatCheckInStatusThunkCreator(userId, day, status));
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
  auth: PropTypes.object,
  checkIn: PropTypes.object,
  updateShabbatCheckInStatusThunk: PropTypes.func,
};
