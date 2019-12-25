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
    const {
      friday,
      saturday,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      fridayMincha,
    } = this.props;

    // console.log('friday in CheckIn: ', friday);
    // console.log('saturday in CheckIn: ', saturday);
    // console.log('sunday in CheckIn: ', sunday);
    // console.log('monday in CheckIn: ', monday);
    // console.log('tuesday in CheckIn: ', tuesday);
    // console.log('wednesday in CheckIn: ', wednesday);
    // console.log('thursday in CheckIn: ', thursday);
    // console.log('fridayMincha in CheckIn: ', fridayMincha);

    return (
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

              <br />

              <hr />

              <br />

              <div className="bold-text-style blue-text-color">
                Chol Services
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
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Monday{' '}
                    <span className="bold-text-style italic-text-style">
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
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Tuesday{' '}
                    <span className="bold-text-style italic-text-style">
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
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Wednesday{' '}
                    <span className="bold-text-style italic-text-style">
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
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Thursday{' '}
                    <span className="bold-text-style italic-text-style">
                      Mincha
                    </span>
                  </span>
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="fridayMincha"
                    checked={fridayMincha}
                    onChange={event => this.handleChange(event)}
                  />

                  <span className="gray-text-color">
                    Friday{' '}
                    <span className="bold-text-style italic-text-style">
                      Mincha
                    </span>
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

// Container
const mapStateToProps = state => ({
  friday: state.user.friday,
  saturday: state.user.saturday,
  sunday: state.user.sunday,
  monday: state.user.monday,
  tuesday: state.user.tuesday,
  wednesday: state.user.wednesday,
  thursday: state.user.thursday,
  fridayMincha: state.user.fridayMincha,
});

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
  sunday: PropTypes.bool,
  monday: PropTypes.bool,
  tuesday: PropTypes.bool,
  wednesday: PropTypes.bool,
  thursday: PropTypes.bool,
  fridayMincha: PropTypes.bool,
};
