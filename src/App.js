// Imports
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  Navbar,
  SignIn,
  SignUp,
  AdminPanel,
  Dashboard,
  Shacharit,
  Mincha,
  Maariv,
  Shabbat,
  PageNotFound,
} from './components';

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
