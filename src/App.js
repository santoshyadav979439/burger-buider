import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";

import { Route, Switch, Redirect } from "react-router-dom";

import Logout from "./Containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import asyncComponent from './hoc/asyncComponent/asyncComponent'
const asyncCheckout =asyncComponent(()=>{
  return import('./Containers/Checkout/Checkout')
})
const asyncAuth =asyncComponent(()=>{
  return import('./Containers/Auth/Auth')
})
const asyncOrders =asyncComponent(()=>{
  return import('./Containers/Orders/Orders')
})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }
    return <Layout>{route}</Layout>;
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  };
};
const mapDispatchToProp = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};
export default connect(mapStateToProps, mapDispatchToProp)(App);
