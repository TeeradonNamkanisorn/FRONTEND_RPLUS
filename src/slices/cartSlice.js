import { createSlice } from "@reduxjs/toolkit";

const CART_INITIAL_STATE =  {
    isLoading: false,
    error: "",
    cart: {

    }
    // {"123": {price: "100", id: "123"}}
}
const cartSlice = createSlice({
    name: "cart",
    initialState: CART_INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            const {courseId, price} = action.payload;
            state.cart[courseId] = {
                id: courseId,
                price
            }
        },
        clearCart: (state, action) => {
            state.cart = {}
        },
        removeById: (state, action) => {
            const {id} = action.payload;
            delete state.cart[id];
        }
    }
});

export const {addToCart, clearCart, removeById} = cartSlice.actions;
export default cartSlice;