import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { checkInThunkCreator } from '../../store/reducers/checkInReducer';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      checkedFriday: false,
      checkedSaturday: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const casedCurDay = curDay.toLowerCase();
    const { auth, checkInThunk } = this.props;

    if (curCheckedVal) {
      this.setState({ ['checked' + curDay]: true });

      checkInThunk(auth.uid, casedCurDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to cancel your RSVP?'
      );

      if (changeConfirmation) {
        this.setState({ ['checked' + curDay]: false });

        checkInThunk(auth.uid, casedCurDay, false);
      }
    }
  }

  render() {
    console.log('props: ', this.props);

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
                    checked={this.state.checkedFriday}
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
                    checked={this.state.checkedSaturday}
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

const mapStateToProps = state => ({
  checkIn: state.checkIn,
});

const mapDispatchToProps = dispatch => ({
  checkInThunk(userId, day, status) {
    dispatch(checkInThunkCreator(userId, day, status));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckIn);
