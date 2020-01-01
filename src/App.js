import React,{Component} from 'react';
import Layout from '../src/hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import {Route,Switch} from 'react-router-dom'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'
import * as actions from './store/actions/index';
import {connect} from 'react-redux'
class App extends Component {
  componentDidMount (){
    this.props.onTryAutoSignIn()
  }
render(){
  return (
 
    <Layout>
      <Switch>
      <Route path ='/checkout' component={Checkout} />
      <Route path ='/orders' component = {Orders} />
      <Route path = '/auth' component ={Auth} />
      <Route path ='/logout'  component={Logout} />  
      <Route path ='/' component={BurgerBuilder} />
</Switch>
   
    </Layout>

   
  );
}
}
const mapDispatchToProp =(dispatch)=>{
  return{
    onTryAutoSignIn :()=>dispatch(actions.authCheckState())
  }
}
export default connect(null,mapDispatchToProp)(App);
