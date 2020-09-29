import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import Videos from '~/pages/Videos';
import Theme from '~/pages/Theme';
import * as Pages from '~/pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Pages.Landing} />

      <Route path="/videos" isPrivate component={Videos} />
      <Route path="/principal" isPrivate component={Dashboard} />

      <Route path="/theme" component={Theme} />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
