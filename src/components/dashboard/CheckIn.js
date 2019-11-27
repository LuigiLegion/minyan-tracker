// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateCheckInStatusThunkCreator } from '../../store/reducers/userReducer';

// Component
class CheckIn extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.checked in CheckIn handleChange: ', event.target.checked);
    // console.log('event.target.value in CheckIn handleChange: ', event.target.value);

    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const { auth, updateCheckInStatusThunk } = this.props;

    // console.log('auth in CheckIn: ', auth);
    // console.log('updateCheckInStatusThunk in CheckIn: ', updateCheckInStatusThunk);

    if (curCheckedVal) {
      updateCheckInStatusThunk(auth.uid, curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      // console.log('changeConfirmation in CheckIn handleSubmit: ', changeConfirmation);

      if (changeConfirmation) {
        updateCheckInStatusThunk(auth.uid, curDay, false);
      }
    }
  }

  render() {
    const { friday, saturday } = this.props;

    // console.log('friday in CheckIn: ', friday);
    // console.log('saturday in CheckIn: ', saturday);

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Check-In</span>
            </span>

            <form className="custom-form">
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="friday"
                    checked={friday}
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">Friday Maariv</span>
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

                  <span className="gray-text-color">Saturday Shacharit</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Container
const mapStateToProps = state => {
  // console.log('state in CheckIn mapStateToProps: ', state);

  return {
    friday: state.user.friday,
    saturday: state.user.saturday,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCheckInStatusThunk(userId, day, status) {
    dispatch(updateCheckInStatusThunkCreator(userId, day, status));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckIn);

// Prop Types
CheckIn.propTypes = {
  auth: PropTypes.object,
  updateCheckInStatusThunk: PropTypes.func,
  friday: PropTypes.bool,
  saturday: PropTypes.bool,
};
