import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/app.scss";

import Home from "./Home";
import Details from "./components/Details";

const App: React.FunctionComponent = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id/details" component={Details} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
