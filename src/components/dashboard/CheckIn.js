import React, { Component } from 'react';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };
  }

  componentDidMount() {}

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
                  <input type="checkbox" disabled={this.state.disable} />
                  <span>Friday Maariv</span>
                </label>
              </div>

              <div>
                <label>
                  <input type="checkbox" disabled={this.state.disabled} />
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
                <input type="checkbox" />
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
