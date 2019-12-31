// Imports
import React from 'react';
import PropTypes from 'prop-types';

import SingleService from './SingleService';

// Component
const ServicesList = ({ attendance }) => {
  // console.log('attendance in ServicesList: ', attendance);

  const attendanceArr = Object.values(attendance);

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

export default ServicesList;

// Prop Types
ServicesList.propTypes = {
  attendance: PropTypes.object,
};
