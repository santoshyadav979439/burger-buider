import React from 'react';
import classes from './Input.module.css'


const Input  =(props)=>{
    const inputClasses = [classes.InputElement];
    let validationErrorMessage = null;
    
if(props.invalid && props.shouldValidate && props.touched)
{
    validationErrorMessage = <p>Please  enter valid {props.valueType}</p>
    inputClasses.push(classes.Invalid);
   
}
    let inputElement = null;
    switch(props.elementtype){
        case ('input'):
            inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}  />  
            break;
        case ('textarea'): 
            inputElement = <textarea  {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}  />
            break;
            case ('select'): 
            inputElement = (
                <select 
            className={inputClasses.join(' ')}
             value={props.value} onChange={props.changed} >
             {props.elementConfig.options.map(el=>(
                <option key={el.value} value={el.value}>{el.displayValue}</option>
             ))}
             </select>
            )
           
            break;
        default:
            inputElement=<input  className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />  
    }
    return(
    <div className={classes.Input}>

{inputElement}
{validationErrorMessage}
    </div>
    )
}
export default Input;