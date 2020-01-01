import React from 'react';
import Navigationitem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
const Navigationitems = (props) => {
   let authOrLogout =<Navigationitem link ="/auth" > Athentication</Navigationitem >
   if(props.isAuthenticated)
   authOrLogout =(<React.Fragment>
       <Navigationitem link ="/Orders" > Orders </Navigationitem >
      <Navigationitem link ="/logout" > Logout</Navigationitem >
         </React.Fragment>)
    return (
       <ul className ={classes.NavigationItems}>
          <Navigationitem link ="/" exact >Burger Builder </Navigationitem >
         
        
          {authOrLogout}
       </ul>
    );
};

export default Navigationitems;