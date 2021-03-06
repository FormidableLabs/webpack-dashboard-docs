import React from "react";
import { Route, IndexRoute } from "react-router";
import Home from "./screens/home/index";
import { Guide, Docs } from "./screens/docs/index";

// Components
import App from "./components/app";

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/docs" component={Docs}/>
    <Route path="/docs/getting-started" component={Guide}/>
  </Route>
);
