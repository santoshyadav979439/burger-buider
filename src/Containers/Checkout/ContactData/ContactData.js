import React ,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from './../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import Input from '../../../Components/UI/Input/Input'
class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your email'
                },
                value:''
            },
           
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zipcode'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'fastest'},
                        {value:'cheapest',displayValue:'cheapest'}
                ]
                },
                value:''
            }
        }
      
       
        
      
    }
    orderHandler =(event)=>
    {
        event.preventDefault();
        const formData={}
        for(let elementName in this.state.orderForm){
            formData[elementName] =this.state.orderForm[elementName].value;
           }
            const order ={
           ingrediants:this.props.ing,
           price:this.props.price,
            customer:formData
             }
    this.props.placingOrder(order);
             
    }
   onChnageHandler= (event,id)=>
   {
    const updatedState={...this.state.orderForm};
    const updatedInput={...this.state.orderForm[id]}
    updatedInput.value = event.target.value
       updatedState[id] = updatedInput
    
        this.setState(
            {
                orderForm:updatedState
            }
        )
   }
    render()
    {
        let orderFormUpdated = {...this.state.orderForm};
        const formData =  Object.keys(orderFormUpdated).map(key=>(
        <Input key ={key} elementtype={orderFormUpdated[key].elementType} 
       changed = {(event)=>this.onChnageHandler(event,key)}
         elementConfig ={orderFormUpdated[key].elementConfig} 
         value = {orderFormUpdated[key].value} />))
           
        let form=(<form onSubmit={this.orderHandler}>
             {formData}
            <Button className={classes.Input}  btnType="Success" >Order</Button>
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

