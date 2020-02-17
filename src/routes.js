import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/principal" component={Dashboard} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
