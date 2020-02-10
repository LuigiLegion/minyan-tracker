// Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

// Component
const Welcome = ({ parashotCollection = [] }) => {
  const [counter, setCounter] = useState(0);
  const [parashot, setParashot] = useState(['Loading...']);

  useEffect(() => {
    if (parashotCollection.length) {
      const parashotDocument = parashotCollection[0];
      setCounter(parashotDocument.counter);
      setParashot(parashotDocument.parashot);
    }
    // eslint-disable-next-line
  }, [parashotCollection]);

  return (
    <div className="col s12 m6">
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Services</span>
            </span>

            <span className="bold-text-style">This Week's Parasha: </span>

            <span className="italic-text-style">{parashot[counter]}</span>

            <ul>
              <li>
                <NavLink to="/shabbat">
                  <span className="bold-text-style">Shabbat Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/mincha">
                  <span className="bold-text-style">Mincha Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/maariv">
                  <span className="bold-text-style">Maariv Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/shacharit">
                  <span className="bold-text-style">Shacharit Services</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  parashotCollection: state.firestore.ordered.parashot,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'parashot',
    },
  ])
)(Welcome);

// Prop Types
Welcome.propTypes = {
  parashotCollection: PropTypes.array,
};
