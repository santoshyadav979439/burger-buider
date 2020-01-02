import React ,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from './../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import Input from '../../../Components/UI/Input/Input';
import {updateObject,checkValidity} from '../../../shared/utility'
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
            customer:formData,
            userId:this.props.userId
             }
        this.props.placingOrder(order,this.props.token);
}
    // checkValidity =(value,rule)=>{
    //     let isValid =true;
    //     if(rule.required)
    //     isValid = value.trim() !=='' && isValid
       
    //     if(rule.minLength)
    //     {
    //         isValid = value.trim().length >= rule.minLength && isValid
    //     }
    //     if(rule.maxLength)
    //     {
    //         isValid = value.trim().length <= rule.maxLength && isValid
    //     }
    //     return isValid;
    // }

   onChnageHandler= (event,id)=>
   {
       let valid= true;
  if(this.state.orderForm[id].validation)
  valid=checkValidity(event.target.value,this.state.orderForm[id].validation)
    const updatedInput=updateObject(this.state.orderForm[id],
        {
            value : event.target.value,
            touched :true,
            valid : valid

           })

    
    
    const updatedState=updateObject(this.state.orderForm,{
        [id]:updatedInput
    })
   
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
        loading : state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        placingOrder: (orderData,token)=>dispatch(actions.placingOrder(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios) );

