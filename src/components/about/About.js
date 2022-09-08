// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="section">
            <div className="card white">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">
                    About
                  </span>
                </span>

                <div className="divider" />

                <div className="card-content">
                  <div>
                    Minyan Tracker is an attendance tracker for services.
                  </div>

                  <div>
                    I built it as a tool that helps members of small
                    congregations organize services by allowing them to
                    determine if they can form a minyan for a given service.
                  </div>

                  <div className="section">
                    The app allows users to check-in to services at their
                    congregations and share their check-in status with their
                    fellow congregation members in real time.
                  </div>

                  <div>
                    I hope you like it, enjoy!
                  </div>
                </div>

                <NavLink
                  className="text-style-bold"
                  to="/"
                >
                  ← Back To Main Page
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exports
export default About;
