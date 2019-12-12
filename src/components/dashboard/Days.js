// Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FridayMaariv from './FridayMaariv';
import SaturdayShacharit from './SaturdayShacharit';
import SundayMincha from './SundayMincha';
import MondayMincha from './MondayMincha';
import TuesdayMincha from './TuesdayMincha';
import WednesdayMincha from './WednesdayMincha';
import ThursdayMincha from './ThursdayMincha';
import FridayMincha from './FridayMincha';

// Component
const Days = ({ attendance }) => {
  // console.log('attendance in Days: ', attendance);

  const {
    friday,
    saturday,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    fridayMincha,
  } = attendance;

  // console.log('friday in Days: ', friday);
  // console.log('saturday in Days: ', saturday);
  // console.log('sunday in Days: ', sunday);
  // console.log('monday in Days: ', monday);
  // console.log('tuesday in Days: ', tuesday);
  // console.log('wednesday in Days: ', wednesday);
  // console.log('thursday in Days: ', thursday);
  // console.log('fridayMincha in Days: ', fridayMincha);

  return (
    <div className="col s12 m6">
      <FridayMaariv friday={friday} />

      <SaturdayShacharit saturday={saturday} />

      <SundayMincha sunday={sunday} />

      <MondayMincha monday={monday} />

      <TuesdayMincha tuesday={tuesday} />

      <WednesdayMincha wednesday={wednesday} />

      <ThursdayMincha thursday={thursday} />

      <FridayMincha fridayMincha={fridayMincha} />
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
