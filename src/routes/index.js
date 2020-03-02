import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import Home from '~/pages/Home';
import Videos from '~/pages/Videos';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/videos" isPrivate component={Videos} />
      <Route path="/principal" isPrivate component={Dashboard} />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
