// Imports
import React from 'react';
import PropTypes from 'prop-types';

import { Service } from '..';

// Component
const Services = ({ attendance }) => {
  const attendanceArr = Object.values(attendance);

  return (
    <div className="col s12 m6">
      {attendanceArr.map(curService => (
        <Service
          key={`${curService.day} ${curService.type}`}
          service={curService}
        />
      ))}
    </div>
  );
};

// Prop Types
Services.propTypes = {
  attendance: PropTypes.object,
};

// Exports
export default Services;
