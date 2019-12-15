import * as actionType from './actionType';
//import * as helperFunction from './helperFunctions'
const initiatState={
    ingredients:{
        meat:0,
        cheese:0,
        salad:0,
        bacon:0
    },
    totalPrice:4
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
              
        
       default:
           return state;
    }
   
}
export default reducer