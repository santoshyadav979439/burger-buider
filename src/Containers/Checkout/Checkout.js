import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
//import queryString from 'query-string'
import {Route} from 'react-router-dom'
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
        
        return (
            <div>
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
}
const mapStateToProps =(state)=>
{
    return {
        ing:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);