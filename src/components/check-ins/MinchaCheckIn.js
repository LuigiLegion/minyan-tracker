// Imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { updateMinchaCheckInStatusThunkCreator } from '../../store/reducers/minchaCheckInReducer';

// Component
class MinchaCheckIn extends PureComponent {
  handleChange = event => {
    const curCheckedVal = event.target.checked;
    const curDay = event.target.value;

    if (curCheckedVal) {
      this.props.updateMinchaCheckInStatusThunk(curDay, true);
    } else {
      const changeConfirmation = window.confirm(
        'Are you sure you want to change your check-in status?'
      );

      if (changeConfirmation) {
        this.props.updateMinchaCheckInStatusThunk(curDay, false);
      }
    }
  };

  render() {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    } = this.props.checkIn;

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
                  Mincha Services
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
                      value="friday"
                      checked={friday}
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
  }
}

// Container
const mapDispatchToProps = dispatch => ({
  updateMinchaCheckInStatusThunk(day, status) {
    dispatch(updateMinchaCheckInStatusThunkCreator(day, status));
  },
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(MinchaCheckIn);

// Prop Types
MinchaCheckIn.propTypes = {
  checkIn: PropTypes.object,
  updateMinchaCheckInStatusThunk: PropTypes.func,
};
