import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
//import queryString from 'query-string'
import {Route,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'
class Checkout extends Component {
   
 checkoutChancelHandler = ()=>
 {
     console.log('inside new candfdel')
     this.props.history.goBack();
 }
 checkoutContinuedHandler =()=>
 {
     this.props.history.replace('/checkout/contact-details');
 }
    render() {
        const redirectToRoot=this.props.purchased?<Redirect to ="/" /> :null
       let summary = <Redirect to ="/" />
       if(this.props.ing)
       {
           summary =(
               <div>
                   {redirectToRoot}
                   <CheckoutSummary
            CheckoutContinued={this.checkoutContinuedHandler} 
            CheckoutCancelled={this.checkoutChancelHandler}
             ingredients={this.props.ing}
             price={this.props.price}
             />
        <Route path={this.props.match.path + '/contact-details'} 
    component={ContactData } /> 
               </div>
            
           )
       }
        return summary;
    }
}
const mapStateToProps =(state)=>
{
    return {
        ing:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);