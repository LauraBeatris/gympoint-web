import React from 'react';
import { Switch } from 'react-router-dom';

// Route Wrapper -> Redirect based in the authentication status of the user
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Registrations from '~/pages/Registrations';
import Plans from '~/pages/Plans';
import HelpOrders from '~/pages/HelpOrders';

import StudentsRegister from '~/pages/Students/register';
import RegistrationsRegister from '~/pages/Registrations/register';
import PlansRegister from '~/pages/Plans/register';

import StudentsEdit from '~/pages/Students/edit';
import RegistrationsEdit from '~/pages/Registrations/edit';
import PlansEdit from '~/pages/Plans/edit';

export default function Routes() {
  return (
    <Switch>
      {/* Auth Route */}
      <Route path="/" exact component={SignIn} />

      {/* List Routes */}
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/help-orders" exact component={HelpOrders} isPrivate />

      {/* Registration Routes */}
      <Route path="/students/register" component={StudentsRegister} isPrivate />
      <Route path="/plans/register" component={PlansRegister} isPrivate />
      <Route
        path="/registrations/register"
        component={RegistrationsRegister}
        isPrivate
      />

      {/* Edition Routes */}
      <Route
        path="/students/:student_id/edit"
        component={StudentsEdit}
        isPrivate
      />
      <Route path="/plans/:plan_id/edit" component={PlansEdit} isPrivate />
      <Route
        path="/registrations/:registration_id/edit"
        component={RegistrationsEdit}
        isPrivate
      />
    </Switch>
  );
}
