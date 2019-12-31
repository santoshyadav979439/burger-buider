import axios from 'axios'
import * as actionType from './actionType'
export const authStart =()=>{
    return {
        type:actionType.AUTH_START
    }
}
export const authSuccess =(authData)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        authData:authData
    }
}
export const authFail =(error)=>{
    return {
        type:actionType.AUTH_FAIL,
        error:error
    }
}
export const auth =(email,password,isSignUP)=>
{
  
    return dispatch=>{
        dispatch(authStart());
     const   authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='';
       if(isSignUP){
           url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdkNGKlnxSIfFXm8LB309BhJD35Q3h3QM'
       }
       else 
       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdkNGKlnxSIfFXm8LB309BhJD35Q3h3QM'
        axios.post(url,authData)
        .then(res=>{
            dispatch(authSuccess(res.data))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err))
        })
    }
}