import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import queryString from 'query-string'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state ={
        ingredients:null,
        price:0
    }
 checkoutChancelHandler = ()=>
 {
     console.log('inside new candfdel')
     this.props.history.goBack();
 }
 checkoutContinuedHandler =()=>
 {
     this.props.history.replace('/checkout/contact-details');
 }

 componentWillMount =()=>
 {
const recievedProps = queryString.parse(this.props.location.search);
const {price,...recievedIngredients}= recievedProps;
this.setState({
        ingredients:recievedIngredients,
        price:price
     })
 }
    render() {
        
        return (
            <div>
                <CheckoutSummary
                CheckoutContinued={this.checkoutContinuedHandler} 
                CheckoutCancelled={this.checkoutChancelHandler}
                 ingredients={this.state.ingredients}
                 price={this.price}
                 />
    <Route path={this.props.match.path + '/contact-details'} 
        render={()=><ContactData {...this.props} ingredients={this.state.ingredients}  totalPrice= {this.state.price}/> } /> 
            </div>
        )
    }
}

export default Checkout;