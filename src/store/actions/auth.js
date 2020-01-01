import axios from 'axios'
import * as actionType from './actionType'
export const authStart =()=>{
    return {
        type:actionType.AUTH_START
    }
}
export const authSuccess =(token,userId)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail =(error)=>{
    return {
        type:actionType.AUTH_FAIL,
        error:error
    }
}
const logOut =()=>{
    return{
        type:actionType.AUTH_LOGOUT
    }
}
export const doLogoutAfterTokenExpire=(expireTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut());
         },expireTime*1000)
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
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(doLogoutAfterTokenExpire(res.data.expiresIn))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}