import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

import Cadastrar from "./pages/Cadastrar";
import Main from "./pages/Main";
import Entrar from "./pages/Entrar";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/entrar" exact component={Entrar} />
        <Route path="/cadastrar" exact component={Cadastrar} />
      </Switch>
    </BrowserRouter>
  );
}
