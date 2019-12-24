import * as actionType from './actionType';
import axios from '../../axios-orders'
const orderSuccess=(orderId,orderData)=>{
    return{
        type:actionType.ORDER_SUCCESS,
        id:orderId,
        orderData:orderData
    }
   
}
const orderFailed =(error)=>{
   return  {
        type:actionType.ORDER_FAILED,
        error:error
    }
}
export const purchaseBurgerStart =()=>{
    return {
        type:actionType.PURCHASE_BURGER_START
    }
}
export const placingOrder = (orderData,axios) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json',orderData).then(response=>
            {
                console.log('[orders action generator]',response.data)
            dispatch(orderSuccess(response.data.name))
            }
            ).catch(error=>{
                dispatch(orderFailed(error))
 })
    }
}
export const  initPurchase=()=>{
    return{
        type:actionType.INIT_PURCHASE
    }
}

const fetchOrderSuccess =(orders)=>{
    return {
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}
const fetchOrderFail = (error)=>{
    return{
        type:actionType.FETCH_ORDER_FAILED,
        error:error
    }
}
const fetchOrderStart = () =>{
    return{
        type:actionType.FETCH_ORDER_START
    }
}
export const fetchOrders =()=>{
   
    return dispatch=>{
        dispatch(fetchOrderStart()) ;
        axios.get('/orders.json').then(response=>{
          
            const ordersArray=[]
            for(let key in response.data)
            {
                ordersArray.push(
                     {
                         ...response.data[key],
                         id:key
                     }
            )
 
            }
     dispatch(fetchOrderSuccess(ordersArray));
         })
         .catch(err=>{
            dispatch(fetchOrderFail(err))
         })
    }
}