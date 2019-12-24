import {combineReducers} from 'redux';
import burgerBuilder from './burgerBuilder';
import order from './order'
 const reducer = combineReducers(
    {
        burgerBuilder,
        order
    }
);
export default reducer;