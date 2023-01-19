import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        removeProduct: (state, action) => {
            const checkProduct = obj => obj._id === action.payload._id && obj.color === action.payload.color;
            if (state.products.some(checkProduct)) {
                state.products = state.products.filter(
                    (product) =>
                        !(product._id === action.payload._id && product.color === action.payload.color)
                )
            }
            state.quantity -= action.payload.quantity;
            state.total -= action.payload.price * action.payload.quantity;


        },
        updateProduct: (state, action) => {
            const checkProduct = obj => obj._id === action.payload._id && obj.color === action.payload.color;
            if (state.products.some(checkProduct)) {
                state.products = state.products.map(
                    (product) => {
                        if (product._id === action.payload._id && product.color === action.payload.color) {
                            state.quantity -= product.quantity;
                            state.total -= product.price * product.quantity;
                            state.quantity += action.payload.quantity;
                            state.total += action.payload.price * action.payload.quantity;
                            return {
                                ...product,
                                quantity: (action.payload.quantity)
                            }
                        }
                        return product
                    }
                )
            }

        },
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            const checkProduct = obj => obj._id === action.payload._id && obj.color === action.payload.color;
            if (state.products.some(checkProduct)) {
                state.products = state.products.map(
                    (product) => (product._id === action.payload._id && product.color === action.payload.color) ?

                        {
                            ...product,
                            quantity: (product.quantity + action.payload.quantity)
                        }
                        : product
                )
            } else {
                state.products.push(action.payload);
            }
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const {addProduct, updateProduct, removeProduct,reset} = cartSlice.actions;
export default cartSlice.reducer;
