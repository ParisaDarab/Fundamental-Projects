import { useContext,createContext, useReducer } from "react";
import reducer from "./reducer";
import cartItems from './data'

import{LOADING,
   INCREASE,
   DECREASE,
   DISPLAY_ITEMS,
   REMOVE,
   CLEAR_CART} from './actions'
import { getTotal } from "./utils";
import { useEffect } from "react";

const initialState={
   loading:false,
   cart:new Map()
}

const AppContext=createContext()

export  const AppProvider= ({children})=>{
   const [state,dispatch]=useReducer(reducer,initialState)
   const url = 'https://www.course-api.com/react-useReducer-cart-project';
   const{totalAmount,totalCost}=getTotal(state.cart)
const clearCarts=()=>{
   dispatch({type:CLEAR_CART})
}
const remove=(id)=>{
   dispatch({type:REMOVE,payload:{id}})
   console.log(id);
}
const increase=(id)=>{
   dispatch({type:INCREASE,payload:{id}})
}
const decrease=(id)=>{
   dispatch({type:DECREASE,payload:{id}})
}
const fetchData=async()=>{
   dispatch({type:LOADING})
   const response=await fetch(url)
   const cart=await response.json()
   dispatch({type:DISPLAY_ITEMS,payload:{cart}})
}

useEffect(()=>{
   fetchData()
},[])
 return(
    <AppContext.Provider value={{...state,clearCarts,remove,increase,decrease,totalAmount,totalCost}}>
             {children}
    </AppContext.Provider>
 ) 

}

export function useGlobalContext(){
    return useContext(AppContext)
    }