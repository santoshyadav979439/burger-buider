import React,{Component} from 'react';
import Auxilary from '../Auxilary/Auxilary'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state ={
        showSideDrawer:false
    }
   SideDrawerClosedHandler= () =>
   {
 this.setState(
     {
       showSideDrawer:false
     }
 )
 
   }
   SideDrawerToggleHandler=()=>
 {
     
     this.setState((prevState)=>{
         return {showSideDrawer:!prevState.showSideDrawer}
     }
     )
 }
    render(){
        return(
            <Auxilary>
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
             <main className ={classes.Content}>{this.props.children}</main>
         
            </Auxilary>
        )
    }
   
}
    

export default Layout;