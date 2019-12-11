import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENT_PRICE={
    meat:50,
    cheese:40,
    bacon:30,
    salad:10
}
class BurgerBuilder extends Component {

    state ={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
   componentDidMount=()=>{
       axios.get("https://react-my-burger-efe50.firebaseio.com/ingredients.json").then(response=>{
    this.setState({
            ingredients:response.data
           })
       }).catch(err=>
        {
            this.setState({error:true})})
   }
    addIngredientHandler= (type)=>
    {
        
        const oldCount =this.state.ingredients[type];
        const updatedCount =oldCount+1;
        let updatedIngrediantState ={...this.state.ingredients};
        updatedIngrediantState[type]=updatedCount;
       const oldPrice =this.state.totalPrice;
       const priceAdded =INGREDIENT_PRICE[type];
       const newPrice =oldPrice + priceAdded
        this.setState(
            {
                ingredients: updatedIngrediantState,
                totalPrice:newPrice
            }
        )
        this.updatePurchasable(updatedIngrediantState)
    }
    deleteIngredientHandler= (type)=>
    {
        
        const oldCount =this.state.ingredients[type];
        if(oldCount>0){
        const updatedCount =oldCount-1;
        let updatedIngrediantState ={...this.state.ingredients};
        updatedIngrediantState[type]=updatedCount;
       const oldPrice =this.state.totalPrice;
       const priceAdded =INGREDIENT_PRICE[type];
       const newPrice =oldPrice - priceAdded
        this.setState(
            {
                ingredients: updatedIngrediantState,
                totalPrice:newPrice
            }
        )
        this.updatePurchasable(updatedIngrediantState)
        }
        
    }
    updatePurchasable =(updatedIngrediantState)=>
    {
        const ingredients ={...updatedIngrediantState}
     console.log(ingredients +"totalItemsCounttotalItemsCount....")
      const totalItemsCount=  Object.keys(ingredients).map(item=>ingredients[item])
        .reduce((sum,count)=>sum+count,0);
        console.log(totalItemsCount + "totalItemsCount")
        this.setState(
            {
                purchasable:totalItemsCount>0
            }
        )
    }
    purchaseHandler =()=>
    {
        this.setState({
            purchasing:true
        })
    }
    orderCanceledHandler =()=>
    {
        this.setState(
            {
                purchasing:false
            }
        )
    }
    purchaseContinueHnadler =  () =>
    {
        this.setState({
            loading:true
        })
        const order ={
            ingrediants:this.state.ingredients,
            price:this.state.totalPrice,
            customer:
            {
                name:'santosh yadav',
                address:{
                    street: 'vibhav khand',
                    city:'lucknow'
                },
                email:'santosh.y2@tcs.com'
            },
            deliveryMethod:'fastest'

        }
        console.log(order)
       axios.post('/orders.json',order).then(response=>
        {
            this.setState(
            {
                loading:false,
                purchasing:false
            }
        )}
        ).catch(err=>{console.log(err)
            this.setState(
                {
                    loading:false,
                    purchasing:false
                }
            )
        })
    }
    render(){
      const disabledInfo ={
            ...this.state.ingredients
        }
        for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key]<=0
        let orderSummary=null;
        let burger=this.state.error?<p>Some error occured</p>:<Spinner />
        console.log(this.state.ingrediants + "this.state.ingrediants")
        if(this.state.ingredients){
            burger= (
           <Auxilary>
               <Burger ingredients ={this.state.ingredients} />
               <BuildControls
                disabled={disabledInfo} 
                addIngrediant={this.addIngredientHandler}
                 deleteIngrediant={this.deleteIngredientHandler} 
                 price={this.state.totalPrice}
                 purchasable={this.state.purchasable}
                 purchasing ={this.purchaseHandler}
                 />
           </Auxilary>
        
       )
       orderSummary =<OrderSummary ingrediants ={this.state.ingredients}
       price={this.state.totalPrice}
         success={this.purchaseContinueHnadler} 
        cancel={this.orderCanceledHandler}/>
            }
            if(this.state.loading)
            {
                orderSummary = <Spinner />
            }
        return (
            <Auxilary>
                <Modal show ={this.state.purchasing}
                backDropClick={this.orderCanceledHandler}
                >
                    {orderSummary}
                </Modal>
               {burger}
            </Auxilary>
        );
    }
}
export default withErrorHandler(BurgerBuilder,axios);