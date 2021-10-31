import React from "react";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import { Switch, Redirect, Route } from "react-router-dom";

const Routes = () => {
  const RedirectLogin = () => {
    return <Redirect to="/login" />;
  };
  return (
    <Switch>
      <Route path="/" exact component={RedirectLogin} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
};
export default Routes;
