import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Principal from './pages/Principal';
import Entrar from './pages/Entrar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/principal" component={Principal} />
        <Route path="/entrar" component={Entrar} />
      </Switch>
    </BrowserRouter>
  );
}
