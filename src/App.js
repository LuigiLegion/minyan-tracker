// Imports
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminPanel from './components/admin/AdminPanel';
import Dashboard from './components/dashboard/Dashboard';
import PageNotFound from './components/404/PageNotFound';

// Component
const App = props => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar>Minyan Tracker</Navbar>

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/:wildcard" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

// Prop Types
App.propTypes = {
  props: PropTypes.object,
};
