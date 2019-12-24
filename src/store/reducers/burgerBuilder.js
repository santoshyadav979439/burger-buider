import * as actionType from '../actions/index';
import {updateObject} from '../utility'
const initiatState={
    ingredients:null,
    totalPrice:0,
    error:false
    
}

const reducer =(state=initiatState,action) =>
{

    switch(action.type)
    {
        case actionType.ADD_INGREDIENT:
         const oldIngredient=state.ingredients;
         const updatedIngredient = {[action.ing_type]:  state.ingredients[action.ing_type] +1}
         const updatedIngredients=updateObject(oldIngredient,updatedIngredient)
        const updatedState ={ingredients:updatedIngredients,totalPrice :state.totalPrice+actionType.INGREDIENT_PRICE[action.ing_type]}
        
       return  updateObject(state,updatedState)
    case actionType.DELETE_INGREDIENT:
         
        const oldIng=state.ingredients;
        if(state.ingredients[action.ing_type] >0){    const updatedIng = {[action.ing_type]:  state.ingredients[action.ing_type] -1}
        const updatedIngs=updateObject(oldIng,updatedIng)
       const updatedSt ={ingredients:updatedIngs,totalPrice :state.totalPrice-actionType.INGREDIENT_PRICE[action.ing_type]}
       return  updateObject(state,updatedSt)  
    }
    else 
    return state
        case actionType.INIT_INGREDIENT:
            const updatedStateInit={  ingredients:action.ingredinets,
                error:false,
                totalPrice:0}
                const updatedObjectInit =updateObject(state,updatedStateInit)
            return updatedObjectInit
            case actionType.ERROR:
                const updatedStateEr= {error:true}
                return updateObject(state,updatedStateEr)
       default:
           return state;
    }
   
}
export default reducer