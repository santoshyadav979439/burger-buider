const redux =require('redux');
// store
const createStore =redux.createStore;
//reducer
const initialState ={
    counter:10,
    name:"santosh"
}
const rootReducer=(state=initialState,action)=>
{
    if(action.type==="INC_Counter")
    {
        return {
            ...state,
            counter:state.counter+1
        }
    }
    if(action.type==="ADD_Counter")
    {
        return {
            ...state,
            counter:state.counter+action.value
        }
    }
    return state;
}


 const store= createStore(rootReducer);
 

 store.subscribe(()=>{
     console.log('[subscribe]',store.getState())
 })
console.log(store.getState())
 //dispaching action
store.dispatch({type:'INC_Counter'})
store.dispatch({type:'ADD_Counter',value:10});
console.log(store.getState())
