// Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SingleService from './SingleService';

// Component
const ServicesList = ({ attendance }) => {
  // console.log('attendance in ServicesList: ', attendance);

  const attendanceArr = [
    attendance.friday,
    attendance.saturday,
    attendance.sunday,
    attendance.monday,
    attendance.tuesday,
    attendance.wednesday,
    attendance.thursday,
    attendance.fridayMincha,
  ];

  // console.log('attendanceArr in ServicesList: ', attendanceArr);

  return (
    <div className="col s12 m6">
      {attendanceArr.map(curService => (
        <SingleService
          key={`${curService.day} ${curService.type}`}
          service={curService}
        />
      ))}
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  attendance: state.attendance,
});

export default connect(mapStateToProps)(ServicesList);

// Prop Types
ServicesList.propTypes = {
  attendance: PropTypes.object,
};
