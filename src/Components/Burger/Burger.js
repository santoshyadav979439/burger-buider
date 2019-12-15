import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngedient/BurgerIngredient';
import React from 'react'
import PropTypes from 'prop-types';
const burger =(props)=>{
    console.log((props.ingredients))
    console.log(Object.keys(props.ingredients))
    let transformedIngredients = Object.keys( props.ingredients )
    .map( igKey => {
        return [...Array(parseInt(props.ingredients[igKey]) )].map( ( _, i ) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        } );
    } )
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
  if(transformedIngredients.length===0)
  transformedIngredients="please add ingredient to start building burger"
   console.log(transformedIngredients)
   return(
    <div className={classes.Burger}>
        <BurgerIngredient type ='bread-top' />
        {transformedIngredients}
        <BurgerIngredient type ='bread-bottom' />
    </div>
)
   
}
burger.propTypes={
    ingredients:PropTypes.object
    
}

export default burger;