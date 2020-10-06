// Imports
import React from 'react';
import PropTypes from 'prop-types';

import SingleService from './SingleService';

// Component
const ServicesList = ({ attendance }) => {
  const attendanceArr = Object.values(attendance);

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

// Prop Types
ServicesList.propTypes = {
  attendance: PropTypes.object,
};

// Exports
export default ServicesList;
