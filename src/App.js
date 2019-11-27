// Imports
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminPanel from './components/admin/AdminPanel';

// Component
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>MinyanTracker</Navbar>

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/admin" component={AdminPanel} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
