import * as actionType from '../actions/index';
//import * as helperFunction from './helperFunctions'
const initiatState={
    ingredients:null,
    totalPrice:0,
    error:false
    
}
// const fetchData =async()=>
// {
//   const response = await axios.get("https://react-my-burger-efe50.firebaseio.com/ingredients.json");
//   return response;
// }
const reducer =(state=initiatState,action) =>
{

    switch(action.type)
    {
        case actionType.ADD_INGREDIENT:
         
       return  {
       ...state,
       ingredients:{...state.ingredients,
    [action.ing_type]:  state.ingredients[action.ing_type] +1
    },
    totalPrice :state.totalPrice+ actionType.INGREDIENT_PRICE[action.ing_type]
            }

            case actionType.DELETE_INGREDIENT:
         
                return  {
                ...state,
                ingredients:{...state.ingredients,
             [action.ing_type]:  state.ingredients[action.ing_type] -1
             },
             totalPrice :state.totalPrice-actionType.INGREDIENT_PRICE[action.ing_type]
                     }
              
        case actionType.INIT_INGREDIENT:
            return{
                ...state,
                ingredients:action.ingredinets,
                error:false

            }
            case actionType.ERROR:
                return {
                    ...state,
                    error:true
                }
       default:
           return state;
    }
   
}
export default reducer