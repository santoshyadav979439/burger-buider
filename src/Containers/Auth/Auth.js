import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner'
import {connect} from 'react-redux';class Auth extends Component {
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
        },
        isSignUp:true
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
           const pattern =/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
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
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }
    switchAuthModeHandler = ()=>{
        this.setState(prevState=>{
            return {
                isSignUp:!prevState.isSignUp
            }
        })
    }
    render() {
        let authFormUpdated = {...this.state.controls};
        let errorMessage=null;
        if(this.props.error){
            errorMessage = this.props.error.message;
        }
        
          let  form =  Object.keys(authFormUpdated).map(key=>(
                <Input key ={key} elementtype={authFormUpdated[key].elementType} 
               changed = {(event)=>this.onChnageHandler(event,key)}
                 elementConfig ={authFormUpdated[key].elementConfig} 
                 invalid ={ !authFormUpdated[key].valid }
                 shouldValidate={authFormUpdated[key].validation}
                 touched = {authFormUpdated[key].touched}
                 valueType ={key}
                 value = {authFormUpdated[key].value} />))
                 if(this.props.loading)     
                 form =<Spinner />
        return (
            <div className={classes.Auth}>
             <p>{errorMessage}</p>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>{this.state.isSignUp?'SIGNUP':'SIGNIN'}</Button>
        </form>
    <Button btnType='Danger' clicked ={this.switchAuthModeHandler}>Switch to {this.state.isSignUp?"SignIn":"SignUp"}</Button>
            </div>
        );
    }
}
const mapStateToProps =(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUP)=>dispatch(actions.auth(email,password,isSignUP))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);