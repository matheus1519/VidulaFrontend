import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Videos from './pages/Videos';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/videos" component={Videos} />
        <Route path="/principal" component={Dashboard} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
