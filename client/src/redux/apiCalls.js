import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import axios from "axios";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
} from "./productRedux";

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/register", user);
        const newUser = {username: res.data.username, password: res.data.username};
        dispatch(loginSuccess({...newUser}));
        return false
    } catch (err) {
        dispatch(loginFailure());
        return true
    }
}
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        return false
    } catch (err) {
        dispatch(loginFailure());
        return true
    }
};


export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await axios.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await axios.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        dispatch(updateProductSuccess({id, product}));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await axios.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};