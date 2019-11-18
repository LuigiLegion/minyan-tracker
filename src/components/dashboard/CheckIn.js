import React, { Component } from 'react';

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
    // this.setState({ disabledFriday: true, checkedSwitch: false });

    // console.log('curDisabledFridayVal: ', event.target.type);

    // event.preventdefault();

    const curDay = event.target.value;

    console.log('curDay: ', curDay);

    const curCheckedVal = event.target.checked;

    console.log('curCheckedVal: ', curCheckedVal);

    if (curCheckedVal) {
      console.log('in the ELSE');

      this.setState({ ['checked' + curDay]: true });
    } else {
      console.log('in the OUTER IF');

      const changeConfirmation = window.confirm(
        'Are you sure you want to cancel your check-in status?'
      );

      console.log('changeConfirmation: ', changeConfirmation);

      if (changeConfirmation) {
        console.log('in the INNER IF');

        this.setState({ ['checked' + curDay]: false });
      }
    }
  }

  render() {
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

export default CheckIn;
