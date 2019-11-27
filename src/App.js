// Imports
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminPanel from './components/admin/AdminPanel';
import PageNotFound from './components/404/PageNotFound';
import Dashboard from './components/dashboard/Dashboard';

// Component
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>MinyanTracker</Navbar>

          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/:wildcard" component={PageNotFound} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
