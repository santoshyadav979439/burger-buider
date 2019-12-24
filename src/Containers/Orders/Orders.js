import React,{Component} from 'react';
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner'
class Orders extends Component{
   componentDidMount=()=>{
       this.props.onFetchOrders()
    }
    render()
    {
        let order=<Spinner />
        if(!this.props.loading){
            console.log('[insoide order]'+this.props.loading)
            order= this.props.orders.map(order=>{
               
                return <Order key={order.id} ingredients={order.ingrediants} price={order.price}/>
            })
        }
        return order
    }
}
const mapStateToProps = state =>{
  return{  
      orders: state.order.orders,
      loading:state.order.loading
    }
}
const mapDispatchToProps =dispatch =>{
    return{
        onFetchOrders:()=>dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));