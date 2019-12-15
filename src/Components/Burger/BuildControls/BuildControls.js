import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'
const controls =[
    { label:"Meat",type:"meat"},
    {label:"Cheese",type:"cheese"},
    {label:"Bacon",type:"bacon"},
    {label:"Salad",type:"salad"},

]
const buildControl = (props) => {
    return (
        <div className={classes.BuildControls}>
<p>Price is: {props.price}</p>
         {controls.map(el=>{
                 return <BuildControl
                 key = {el.type}
                 added ={()=>props.addIngrediant(el.type)} 
                 deleted= {()=>props.deleteIngrediant(el.type)}
                 label={el.label}
              
                 disabled ={props.disabled[el.type]}
                 />
             })}   
             <button className ={classes.OrderButton} disabled ={!props.purchasable} onClick ={props.purchasing}>ORDER NOW</button>
        </div>
    );
};

export default buildControl;