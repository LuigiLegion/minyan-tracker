import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { updateCheckInStatusThunkCreator } from '../../store/reducers/checkInReducer';

class CheckIn extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const casedCurDay = curDay.toLowerCase();
    const { auth, updateCheckInStatusThunk } = this.props;

    if (curCheckedVal) {
      this.setState({ ['checked' + curDay]: true });

      updateCheckInStatusThunk(auth.uid, casedCurDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to cancel your RSVP?'
      );

      if (changeConfirmation) {
        this.setState({ ['checked' + curDay]: false });

        updateCheckInStatusThunk(auth.uid, casedCurDay, false);
      }
    }
  }

  render() {
    // console.log('this.props: ', this.props);

    const { checkedFriday, checkedSaturday } = this.props.checkIn;

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Check-In</span>
            </span>

            <form className="check-in-form">
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Friday"
                    checked={checkedFriday}
                    onChange={event => this.handleChange(event)}
                  />

                  <span>Friday Maariv</span>
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Saturday"
                    checked={checkedSaturday}
                    onChange={event => this.handleChange(event)}
                  />

                  <span>Saturday Shacharit</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state in CheckIn mapStateToProps: ', state);

  return {
    checkIn: state.checkIn,
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
