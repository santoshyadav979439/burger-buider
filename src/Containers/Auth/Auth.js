import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import {updateObject,checkValidity} from '../../shared/utility'
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
    
    onChnageHandler= (event,id)=>
    {

     //const updatedInput={...this.state.controls[id]}
     const updatedInput = updateObject(this.state.controls[id],{
      value:  event.target.value,
      valid : checkValidity(this.state.controls[id].value,this.state.controls[id].validation),
      touched:true
     })
    //  updatedInput.value = event.target.value;
    //  if(updatedInput.validation)
    //  updatedInput.valid = this.checkValidity(updatedInput.value,updatedInput.validation);
    //  updatedInput.touched =true;
    
     const updatedState =updateObject(this.state.controls,{
         [id]: updatedInput
     })
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
    componentDidMount (){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/')
        this.props.onSetAuthRedirectPath()
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
                 let redirect =null;
                 if(this.props.isAuthenticated)
                 {
                    redirect=<Redirect to = {this.props.authRedirectPath} />
                 }
        return (
            <div className={classes.Auth}>
             {redirect}
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
        error:state.auth.error,
        isAuthenticated:state.auth.token,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUP)=>dispatch(actions.auth(email,password,isSignUP)),
        onSetAuthRedirectPath : ()=>dispatch(actions.authRedirectAction('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);