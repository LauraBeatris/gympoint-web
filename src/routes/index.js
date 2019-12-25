import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import Registrations from '../pages/Registrations';
import Plans from '../pages/Plans';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" component={Students} />
      <Route path="/plans" component={Plans} />
      <Route path="/help-orders" component={HelpOrders} />
      <Route path="/registrations" component={Registrations} />
    </Switch>
  );
}
