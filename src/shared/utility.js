export const updateObject =(oldObject,updatedObject)=>{
return {
    ...oldObject,
    ...updatedObject
}
}
export const checkValidity =(value,rule)=>{
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
