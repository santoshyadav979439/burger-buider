import React from 'react';
import Navigationitem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
const Navigationitems = () => {
    return (
       <ul className ={classes.NavigationItems}>
          <Navigationitem link ="/" active >Burger Builder </Navigationitem >
          <Navigationitem link ="/" > Checkout </Navigationitem >
       </ul>
    );
};

export default Navigationitems;