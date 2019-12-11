import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngedient/BurgerIngredient';
import React from 'react'
const burger =(props)=>{
    console.log("props is"+Object.keys(props.ingredients))
  let transformedIngredients=  Object.keys(props.ingredients).map(igk=>{
       return [...Array(props.ingredients[igk])].map((_,i)=> <BurgerIngredient key ={igk+i} type ={igk}/>
       )
   }).reduce((ac,val)=>[...ac,...val])
  if(transformedIngredients.length===0)
  transformedIngredients="please add ingredient to start building burger"
   
   return(
    <div className={classes.Burger}>
        <BurgerIngredient type ='bread-top' />
        {transformedIngredients}
        <BurgerIngredient type ='bread-bottom' />
    </div>
)
   
}
export default burger;