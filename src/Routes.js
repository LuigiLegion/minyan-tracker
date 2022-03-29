// Imports
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  AdminPanel,
  Shacharit,
  Mincha,
  Maariv,
  Shabbat,
  Dashboard,
  PageNotFound,
} from './components';

// Component
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/admin" component={AdminPanel} />
      <Route exact path="/shacharit" component={Shacharit} />
      <Route exact path="/mincha" component={Mincha} />
      <Route exact path="/maariv" component={Maariv} />
      <Route exact path="/shabbat" component={Shabbat} />
      <Route exact path="/" component={Dashboard} />
      <Route path="/:wildcard" component={PageNotFound} />
    </Switch>
  );
};

// Exports
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
