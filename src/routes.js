import React from "react";
import { Route, IndexRoute } from "react-router";

// Components
import App from "./components/app";
import Home from "./screens/home/index";
import About from "./screens/about/index";
import Docs from "./screens/docs/index";

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/about/" component={About}/>
    <Route path="/docs/(:component/)" component={Docs}/>
  </Route>
);
