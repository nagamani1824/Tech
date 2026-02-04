/*
redux - state managemennt library

3 main concept - action,reducer, store type(name)

reducer- state action function

dispatch


*/

import { createSlice } from "@reduxjs/toolkit";

const storedItem = localStorage.getItem('cartItem')

const initialState = {cartItem : storedItem ? JSON.parse(storedItem) : []}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
    addToCart : (state, action)=>{
        const newItem = action.payload;
        const existItem = state.cartItem.find((item)=> item.id===newItem.id)
        if(existItem){
            existItem.quantity += newItem.quantity
        }
        else{
            state.cartItem.push({
                id:newItem.id,
                ModelName:newItem.ModelName,
                img:newItem.img,
                price:newItem.price,
                des:newItem.des
            })
            localStorage.setItem('cartItem', JSON.stringify(state.cartItem))
        }
    },

     deleteFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    }
})

export default CartSlice.reducer
export const {addToCart, deleteFromCart} = CartSlice.actions

