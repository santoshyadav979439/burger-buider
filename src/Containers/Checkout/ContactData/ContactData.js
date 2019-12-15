import React ,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from './../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {
    state={
       name:'',
        email:'',
        address:{
            street:'',
            postal:''
        },
        loading:false
    }
    orderHandler =(event)=>
    {
        event.preventDefault();
            this.setState({
           loading:true
       })

   
       const order ={
           ingrediants:this.props.ingredients,
           price:this.props.totalPrice,
           customer:
           {
               name:'santosh1 yadav',
               address:{
                   street: 'vibhav khand',
                   postal:'223223'
               },
               email:'santosh.y2@tcs.com'
           }
          

       }
       console.log(order)
      axios.post('/orders.json',order).then(response=>
       {
           this.setState(
           {
               loading:false,
              
           }
          
       )
    this.props.history.push('/')
    }
       ).catch(err=>{console.log(err)
           this.setState(
               {
                   loading:false,
                   
               }
           )
       })
    }
    render()
    {
        let form=(     <form >
               
            <input type="text" className={classes.Input} name ='className={classes.Input} name' placeholder='enter your name'/>
            <input type="email" className={classes.Input} name ='email' placeholder='enter your email'/>
            <input type="text" className={classes.Input} name ='street' placeholder='enter your street'/>
            <input type="text" className={classes.Input} name ='postal' placeholder='enter your postal'/>
            <Button className={classes.Input}  btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>)
        if(this.state.loading)
        form=<Spinner />
        return(
            <div className={classes.ContactData}>
                 <h1>Enter your conatct data</h1>
                {form}
            </div>
     
        )
    }
}
export default ContactData;

