import * as actionType from '../actions/index';
import {updateObject} from '../utility'
const initialState = {
orders:[],
loading:false,
purchased:false
}
const reducer =(state=initialState, action)=>{
switch(action.type)
{
    case actionType.ORDER_SUCCESS:
        const newOrder ={
            ...action.orderData,id:action.id
        }
        return updateObject(state,{ loading:false,
            orders:state.orders.concat(newOrder),
            purchased:true})
      
    case actionType.ORDER_FAILED:
        return updateObject(state,{ loading:false})
    case actionType.PURCHASE_BURGER_START:
        return updateObject(state,{ loading:true})
    case actionType.INIT_PURCHASE:
        return updateObject(state,{ purchased:false})
    case actionType.FETCH_ORDER_START:
        return updateObject(state,{ loading:true})
    case actionType.FETCH_ORDER_SUCCESS:
        return updateObject(state,{orders:action.orders,loading:false})
    case actionType.FETCH_ORDER_FAILED:
        return updateObject(state,{ loading:false})   
    default:
        return state;
}
}
export default reducer;