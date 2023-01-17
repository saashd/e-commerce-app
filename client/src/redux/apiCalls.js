import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import {publicRequest} from "../requestMethods";


export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        const newUser = {username: res.data.username, password: res.data.username};
        dispatch(loginSuccess({...newUser}));
    } catch (err) {
        dispatch(loginFailure());
    }
}
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
