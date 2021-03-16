import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/app.scss";

import Home from "./Home";

const App: React.FunctionComponent = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
