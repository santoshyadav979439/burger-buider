import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png'
import classes from './Logo.module.css'
const Logo = () => {
    return (
        <div className ={classes.Logo}>
            <img src={burgerLogo} alt ='burger builder'/>
        </div>
    );
};

export default Logo;