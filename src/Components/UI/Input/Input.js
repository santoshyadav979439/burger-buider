import React from 'react';
import classes from './Input.module.css'
const Input  =(props)=>{
    let inputElement = null;
    switch(props.elementtype){
        case ('input'):
            inputElement=<input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}  />  
            break;
        case ('textarea'): 
            inputElement = <textarea  {...props.elementConfig} className={classes.InputElement} value={props.value} onChange={props.changed}  />
            break;
            case ('select'): 
            inputElement = (
                <select 
            className={classes.InputElement}
             value={props.value} onChange={props.changed} >
             {props.elementConfig.options.map(el=>(
                <option key={el.value} value={el.value}>{el.displayValue}</option>
             ))}
             </select>
            )
           
            break;
        default:
            inputElement=<input  className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />  
    }
    return(
    <div className={classes.Input}>

{inputElement}
    </div>
    )
}
export default Input;