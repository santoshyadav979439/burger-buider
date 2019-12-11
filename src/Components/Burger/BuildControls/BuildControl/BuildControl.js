import React from 'react';
import classes from '../BuildControl/BuildControl.module.css'
const buildControl =(props) =>{
    console.log(props)
return (
    <div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <button className={classes.More} onClick={props.added} type1={props.type}>More</button>
        <button className={classes.Less} onClick={props.deleted}  disabled={props.disabled}>Less</button>
    </div>
)
}
export default buildControl;