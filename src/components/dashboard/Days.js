// Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FridayMaariv from './FridayMaariv';
import SaturdayShacharit from './SaturdayShacharit';

// Component
const Days = ({ attendance }) => {
  // console.log('attendance in Days: ', attendance);

  const { friday, saturday } = attendance;

  // console.log('friday in Days: ', friday);
  // console.log('saturday in Days: ', saturday);

  return (
    <div className="col s12 m6">
      <FridayMaariv friday={friday} />

      <SaturdayShacharit saturday={saturday} />
    </div>
  );
};

// Container
const mapStateToProps = state => {
  // console.log('state in Days mapStateToProps: ', state);

  return {
    attendance: state.attendance,
  };
};

export default connect(mapStateToProps)(Days);

// Prop Types
Days.propTypes = {
  attendance: PropTypes.object,
};
