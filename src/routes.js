import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Main from './pages/Main';
import Entrar from './pages/Entrar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/entrar" component={Entrar} />
      </Switch>
    </BrowserRouter>
  );
}
