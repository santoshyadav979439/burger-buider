import * as actionType from './actionType';
import axios from '../../axios-orders'
export const addIngredeints=(ing_type)=>{
    return {
        type:actionType.ADD_INGREDIENT,
        ing_type:ing_type

    }
}
export const deleteIngredeints=(ing_type)=>{
    return {
        type:actionType.DELETE_INGREDIENT,
        ing_type:ing_type

    }
}
const setIngredient =(ingredient)=>{
    return{
        type:actionType.INIT_INGREDIENT,
        ingredinets:ingredient
    }
}
const fetchIngredientFailed =()=>{
return {
    type:actionType.ERROR
}
}
export const initIngredient=()=>{
    return dispatch=>{
        axios.get('/ingredients.json').
        then(res=>{
           dispatch(setIngredient(res.data))
            
        }).catch(err=>{
           dispatch(fetchIngredientFailed())
        })
    }
}