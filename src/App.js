import React,{Component} from 'react';
import Layout from '../src/hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import {Route,Switch} from 'react-router-dom'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
class App extends Component {
render(){
  return (
 
    <Layout>
      <Switch>
      <Route path ='/checkout' component={Checkout} />
      <Route path ='/orders' component = {Orders} />
      <Route path = '/auth' component ={Auth} />
      <Route path ='/' component={BurgerBuilder} />
      
      </Switch>
   
    </Layout>

   
  );
}
}

export default App;
