import React,{Component} from 'react';
import Auxilary from '../Auxilary/Auxilary'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
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
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}
             isAuthenticated ={this.props.isAuthenticated}/>
            <SideDrawer open={this.state.showSideDrawer}
            isAuthenticated ={this.props.isAuthenticated}
             closed={this.SideDrawerClosedHandler}/>
             <main className ={classes.Content}>{this.props.children}</main>
         
            </Auxilary>
        )
    }
   
}
 const mapStateToProps = state =>{
     return {
         isAuthenticated:state.auth.token
     }
 }   

export default connect(mapStateToProps) (Layout);