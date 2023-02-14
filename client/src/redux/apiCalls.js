import {
    addUserFailure,
    addUserStart, addUserSuccess,
    deleteUserFailure,
    deleteUserStart, deleteUserSuccess,
    getUserFailure,
    getUserStart,
    getUserSuccess,
    loginFailure,
    loginStart,
    loginSuccess, updateUserFailure, updateUserStart, updateUserSuccess
} from "./userRedux";
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

export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/users");
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        await axios.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({id, user}));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};
export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await axios.post(`/users`, user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
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
        await axios.put(`/products/${id}`, product);
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