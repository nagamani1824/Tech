import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../../Nav/redux/CartSlice'

const Store = configureStore({
    reducer:{
        cart:CartSlice
    },
    devTools:true
})

export default Store