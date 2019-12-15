import React,{Component} from 'react';
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount=()=>{
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
           this.setState({
            loading:false,orders:ordersArray
        })
        })
        .catch(err=>{
            this.setState({
                loading:false
            })
        })
    }
    render()
    {
        return (
            <React.Fragment>
              {
                  this.state.orders.map(order=>{
                      return <Order key={order.key} ingredients={order.ingrediants} price={order.price}/>
                  })
              }
            </React.Fragment>
            
        )
    }
}
export default withErrorHandler(Orders,axios);