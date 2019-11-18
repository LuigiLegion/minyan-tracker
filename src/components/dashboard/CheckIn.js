import React, { Component } from 'react';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      disabledFriday: false,
      disabledSaturday: false,
      checkedSwitch: false,
      boolSwitch: true,
    };

    this.handleClickFriday = this.handleClickFriday.bind(this);
    this.handleClickSaturday = this.handleClickSaturday.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  // componentDidMount() {}

  handleClickFriday() {
    this.setState({ disabledFriday: true, checkedSwitch: false });
  }

  handleClickSaturday() {
    this.setState({ disabledSaturday: true, checkedSwitch: false });
  }

  handleSwitch() {
    const curBoolSwitchVal = this.state.boolSwitch;

    this.setState({
      disabledFriday: !curBoolSwitchVal,
      disabledSaturday: !curBoolSwitchVal,
      boolSwitch: !curBoolSwitchVal,
    });
  }

  render() {
    console.log('this.state.checkedSwitch: ', this.state.checkedSwitch);

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Check-In</span>
            </span>

            <form action="#" className="check-in-form">
              <div>
                <label>
                  <input
                    type="checkbox"
                    disabled={this.state.disabledFriday}
                    onClick={this.handleClickFriday}
                  />
                  <span>Friday Maariv</span>
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    disabled={this.state.disabledSaturday}
                    onClick={this.handleClickSaturday}
                  />
                  <span>Saturday Shacharit</span>
                </label>
              </div>
            </form>

            <span className="card-title">
              <span className="bold-text-style">Change Check-In</span>
            </span>

            <div className="switch">
              <label>
                Disable
                <input
                  type="checkbox"
                  defaultChecked={this.state.checkedSwitch}
                  onClick={this.handleSwitch}
                />
                <span className="lever" />
                Enable
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckIn;
