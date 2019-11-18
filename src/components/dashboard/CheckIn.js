import React, { Component } from 'react';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {}

  handleClick() {
    this.setState({ disabled: true });
  }

  handleSwitch() {
    const curDisabledVal = this.state.disabled;
    this.setState({ disabled: !curDisabledVal });
  }

  render() {
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
                    disabled={this.state.disable}
                    onClick={this.handleClick}
                  />
                  <span>Friday Maariv</span>
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    disabled={this.state.disabled}
                    onClick={this.handleClick}
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
                <input type="checkbox" onClick={this.handleSwitch} />
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
