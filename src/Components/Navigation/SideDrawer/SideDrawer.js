import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxilary from '../../../hoc/Auxilary/Auxilary'
const SideDrawer =(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open)
    {
         attachedClasses=[classes.SideDrawer,classes.Open];
    }
return (
    <Auxilary >
    <Backdrop show ={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick ={props.closed}>
            <div className={classes.Logo} >
        <Logo />
        </div>
        <nav>
        <NavigationItems isAuthenticated ={props.isAuthenticated}/>
        </nav>
        </div>
        </Auxilary>
    )
}
export default SideDrawer;