import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Videos from '~/pages/Videos';
import Theme from '~/pages/Theme';
import * as Pages from '~/pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Pages.Landing} />
      <Route path="/ensinar" component={Pages.Teach} />
      <Route path="/aprender" component={Pages.Learn} />

      <Route path="/assistir" permission="student" component={Pages.Watch} />
      <Route
        path="/administrativo"
        permission="admin"
        component={Pages.Administrative}
      />

      <Route path="/videos" isPrivate component={Videos} />
      <Route path="/theme" isPrivate component={Theme} />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
