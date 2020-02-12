// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const CheckBox = ({ value, checked, handleChange, day, type }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={event => handleChange(event)}
        />

        <span className="gray-text-color">
          {`${day} `}
          <span className="bold-text-style italic-text-style">{type}</span>
        </span>
      </label>
    </div>
  );
};

// Prop Types
CheckBox.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  day: PropTypes.string,
  type: PropTypes.string,
};
