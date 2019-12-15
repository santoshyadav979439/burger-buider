import React from 'react';
import classes from './Order.module.css';
const order =(props) =>
{
    const ingredientArray = [];
    for(let ingredient in props.ingredients)
    {
        ingredientArray.push({name:ingredient,quantity:props.ingredients[ingredient]})

    }
    const ingredientOutPut=ingredientArray.map(ig=>
        {
        return <span style={{
            textTransform:"capitalize",
            display:"inline-block",
            border:"1px solid #ccc",
            margin:"0 8px",
            padding :'5px'
        }} key={ig.name}>{ig.name} ({ig.quantity})</span>
        })
    return (
        <div className ={classes.Order}>
<p>Ingredients: {ingredientOutPut}</p>
            <p>price<strong>{props.price}</strong></p>
        </div>
    )
}
export default order;