import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import axios from "axios";

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/register", user);
        const newUser = {username: res.data.username, password: res.data.username};
        dispatch(loginSuccess({...newUser}));
    } catch (err) {
        dispatch(loginFailure());
    }
}
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
