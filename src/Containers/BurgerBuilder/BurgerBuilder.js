import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
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
//    componentDidMount=()=>{
//     this.props.onComponentMountAction();
//    }
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
     updatePurchasable =()=>
    {
        const ingredients ={...this.props.ingredients}
     console.log(ingredients +"totalItemsCounttotalItemsCount....")
      const totalItemsCount=  Object.keys(ingredients).map(item=>ingredients[item])
        .reduce((sum,count)=>sum+count,0);
        return totalItemsCount>0;
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
         const queryParam =[];
         for(let i in this.state.ingredients)
         {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
         }
         queryParam.push('price='+this.state.totalPrice)
       const queryParamString=  queryParam.join('&');
       
         this.props.history.push({
             pathname:'/checkout',
             search:'?' +queryParamString
         });
 
    }
    render(){
      const disabledInfo ={
            ...this.state.ingredients
        }
        for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key]<=0
        let orderSummary=null;
        let burger=this.state.error?<p>Some error occured</p>:<Spinner />
        console.log(this.props.ingredients + "this.state.ingrediants::::::::::::")
        console.log('[total price]',this.props.totalPrice)
        if(this.props.ingredients){
            burger= (
           <Auxilary>
               <Burger ingredients ={this.props.ingredients} />
               <BuildControls
                disabled={disabledInfo} 
                addIngrediant={this.props.onAddIngredientAction}
              
                 deleteIngrediant={this.props.onRemoveIngredientAction} 
                 price={this.props.totalPrice}
                 purchasable={this.updatePurchasable(this.props.ingredients)}
                 purchasing ={this.purchaseHandler}
                 />
           </Auxilary>
        
       )
       orderSummary =<OrderSummary ingrediants ={this.props.ingredients}
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
                backDropClick={this.orderCanceledHandler} >
                    {orderSummary}
                </Modal>
               {burger}
            </Auxilary>
        );
    }
}
const mapStateToProp =(state) =>{
    
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice

    }
}
const mapDispatchToProp =(dispatch)=>
{
    return {
      onAddIngredientAction:(ing_type)=>{dispatch({type:'ADD_INGREDIENT',ing_type:ing_type})} ,
      onRemoveIngredientAction:(ing_type)=>{dispatch({type:'DELETE_INGREDIENT',ing_type:ing_type})}
    }
}

export default connect(mapStateToProp,mapDispatchToProp)(withErrorHandler(BurgerBuilder,axios));