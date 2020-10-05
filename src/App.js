// Imports
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminPanel from './components/admin/AdminPanel';
import Dashboard from './components/dashboard/Dashboard';
import Shacharit from './components/services/Shacharit';
import Mincha from './components/services/Mincha';
import Maariv from './components/services/Maariv';
import Shabbat from './components/services/Shabbat';
import PageNotFound from './components/404/PageNotFound';

// Component
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar>Minyan Tracker</Navbar>

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route exact path="/shacharit" component={Shacharit} />
          <Route exact path="/mincha" component={Mincha} />
          <Route exact path="/maariv" component={Maariv} />
          <Route exact path="/shabbat" component={Shabbat} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/:wildcard" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

// Exports
export default App;
