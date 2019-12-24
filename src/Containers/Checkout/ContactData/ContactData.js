import React ,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from './../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
    state={
       name:'',
        email:'',
        street:'',
        postal:'',
        
      
    }
    orderHandler =(event)=>
    {
        event.preventDefault();
            const order ={
           ingrediants:this.props.ing,
           price:this.props.price,
           customer:
           {
               name:this.state.name,
                 street: this.state.street,
                postal:this.state.postal,
                 email:this.state.email
           }
             }
    this.props.placingOrder(order);
             
    }
   onChnageHandler= (event)=>
   {
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
   }
    render()
    {
        let form=(<form >
               
            <input type="text" className={classes.Input} name ='name' value ={this.state.name} onChange = {this.onChnageHandler} placeholder=' enter your name'/>
            <input type="email" className={classes.Input} name ='email' value ={this.state.email}  onChange = {this.onChnageHandler} placeholder='enter your email'/>
            <input type="text" className={classes.Input} name ='street' value ={this.state.street}  onChange = {this.onChnageHandler}  placeholder='enter your street'/>
            <input type="text" className={classes.Input} name ='postal' value ={this.state.postal}  onChange = {this.onChnageHandler} placeholder='enter your postal'/>
            <Button className={classes.Input}  btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>)
        if(this.props.loading)
        form=<Spinner />
        return(
            <div className={classes.ContactData}>
                 <h1>Enter your conatct data</h1>
                {form}
            </div>
     
        )
    }
}
const mapStateToProps =(state)=>
{
    return {
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading : state.order.loading
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        placingOrder: (orderData)=>dispatch(actions.placingOrder(orderData,axios))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios) );

