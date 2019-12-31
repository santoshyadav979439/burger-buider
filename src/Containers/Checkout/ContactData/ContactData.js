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
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value:''
            },
           
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zipcode'
                },
                validation:{
                    required:true,
                    minLength:5,
                    maxLength: 5
                },
                valid:false,
                touched:false,
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
                value:'',
                valid:true
            }
        },
        formValid:false
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
    checkValidity =(value,rule)=>{
        let isValid =true;
        if(rule.required)
        isValid = value.trim() !=='' && isValid
       
        if(rule.minLength)
        {
            isValid = value.trim().length >= rule.minLength && isValid
        }
        if(rule.maxLength)
        {
            isValid = value.trim().length <= rule.maxLength && isValid
        }
        return isValid;
    }

   onChnageHandler= (event,id)=>
   {
    const updatedState={...this.state.orderForm};
    const updatedInput={...this.state.orderForm[id]}
    updatedInput.value = event.target.value;
    if(updatedInput.validation)
    updatedInput.valid = this.checkValidity(updatedInput.value,updatedInput.validation);
    updatedInput.touched =true;
    updatedState[id] = updatedInput
    let  isFormValid = true
    for(let formElement in updatedState){
        isFormValid = updatedState[formElement].valid && isFormValid
    }
   
        this.setState(
            {
                orderForm:updatedState,
                formValid:isFormValid
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
         invalid ={ !orderFormUpdated[key].valid }
         shouldValidate={orderFormUpdated[key].validation}
         touched = {orderFormUpdated[key].touched}
         valueType ={key}
         value = {orderFormUpdated[key].value} />))
           
        let form=(<form onSubmit={this.orderHandler}>
             {formData}
            <Button disabled={!this.state.formValid} className={classes.Input}  btnType="Success" >Order</Button>
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

