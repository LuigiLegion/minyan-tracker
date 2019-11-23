import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { updateCheckInStatusThunkCreator } from '../../store/reducers/userReducer';

class CheckIn extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    const { auth, updateCheckInStatusThunk } = this.props;

    if (curCheckedVal) {
      updateCheckInStatusThunk(auth.uid, curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to cancel your RSVP?'
      );

      if (changeConfirmation) {
        updateCheckInStatusThunk(auth.uid, curDay, false);
      }
    }
  }

  render() {
    // console.log('this.props: ', this.props);

    const { friday, saturday } = this.props.user;

    // console.log('friday: ', friday, 'saturday: ', saturday);

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
                    value="friday"
                    checked={friday}
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="checkbox-text-color">Friday Maariv</span>
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

                  <span className="checkbox-text-color">
                    Saturday Shacharit
                  </span>
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
    user: state.user,
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
