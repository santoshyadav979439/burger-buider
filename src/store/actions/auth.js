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
export const logOut =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actionType.AUTH_LOGOUT
    }
}
const setAuthRedirectPath =(path)=>{
    return{
        type:actionType.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authRedirectAction =(path)=>{
  return  dispatch=>{
    dispatch(setAuthRedirectPath(path))
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
            const expireDate = new Date (new Date().getTime() + res.data.expiresIn *1000)
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expireDate)
            localStorage.setItem('userId',res.data.localId)
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(doLogoutAfterTokenExpire(res.data.expiresIn))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}
export const authCheckState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logOut())
        }
        else{
            const expirationDate =new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date())
            dispatch(logOut())
            else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId));
                const expireTime = (expirationDate.getTime()-new Date().getTime())/1000
                dispatch(doLogoutAfterTokenExpire(expireTime))
            }
            
        }
    }
}