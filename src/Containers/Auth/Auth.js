import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
class Auth extends Component {
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
                value:''
            },

            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
                value:''
            },
        }
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
        if(rule.isEmail){
           const pattern =/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
           isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    onChnageHandler= (event,id)=>
    {
     const updatedState={...this.state.controls};
     const updatedInput={...this.state.controls[id]}
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
                controls:updatedState,
                 formValid:isFormValid
             }
         )
    }
    onSubmitHandler =(event)=>
    {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value)
    }
    render() {
        let authFormUpdated = {...this.state.controls};
        const form =  Object.keys(authFormUpdated).map(key=>(
            <Input key ={key} elementtype={authFormUpdated[key].elementType} 
           changed = {(event)=>this.onChnageHandler(event,key)}
             elementConfig ={authFormUpdated[key].elementConfig} 
             invalid ={ !authFormUpdated[key].valid }
             shouldValidate={authFormUpdated[key].validation}
             touched = {authFormUpdated[key].touched}
             valueType ={key}
             value = {authFormUpdated[key].value} />))
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>Signup</Button>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password)=>dispatch(actions.auth())
    }
}
export default connect(null,mapDispatchToProps)(Auth);