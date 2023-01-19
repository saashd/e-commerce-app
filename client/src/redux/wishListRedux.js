import {createSlice} from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishList",
    initialState: {
        products: [],
        quantity: 0
    },
    reducers: {
        removeProduct: (state, action) => {

            state.products = state.products
                .filter((product) => !(product._id === action.payload._id))
            state.quantity -= 1

        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1
        },
    },
});

export const {addProduct, removeProduct} = wishListSlice.actions;
export default wishListSlice.reducer;
