import React, { Component } from 'react';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {};
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

            <form action="#">
              <p>
                <label>
                  <input type="checkbox" />
                  <span>Friday Maariv</span>
                </label>
              </p>

              <p>
                <label>
                  <input type="checkbox" />
                  <span>Saturday Shacharit</span>
                </label>
              </p>

              <div className="switch">
                <label>
                  Disable
                  <input type="checkbox" />
                  <span className="lever" />
                  Enable
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
