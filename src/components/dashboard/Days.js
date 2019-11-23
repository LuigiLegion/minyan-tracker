import React, { Component } from 'react';
import { connect } from 'react-redux';

import FridayMaariv from './FridayMaariv';
import SaturdayShacharit from './SaturdayShacharit';

class Days extends Component {
  render() {
    // const { auth, attendance } = this.props;

    const { attendance } = this.props;

    // console.log('auth: ', auth);

    // console.log('attendance in Days: ', attendance);

    return (
      <div className="col s12 m6">
        <FridayMaariv attendance={attendance.friday} />

        <SaturdayShacharit attendance={attendance.saturday} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state in Dashboard mapStateToProps: ', state);

  return {
    attendance: state.attendance,
  };
};

export default connect(mapStateToProps)(Days);
