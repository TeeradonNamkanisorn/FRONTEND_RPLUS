import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getAccessToken, saveAccessToken } from '../services/localStorage';
import axios from "../config/axios";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const USER_INFO_INITIAL_STATE  = {
    info: {
        id: "",
        username: "",
        email: "",
        role: "",
    },
    error: {
        message: ""
    },
    isLoading: false,
    isLoggedIn: false
}

const initUser = createAsyncThunk("userInfo/init", async (arg, thunkApi) => {
    try {
        const token = getAccessToken();
        const res = await axios.get("/auth/", {headers: {authorization: 'Bearer '+token}});
        const {userId, email, username, role} = res.data
        return {userId, email, username, role}
    //creates three actions: fulfilled, pending, rejected
    //payload from return is added to the action
    } catch(err) {
        
        return thunkApi.rejectWithValue('error')
    }
});

const loginUser = createAsyncThunk("userInfo/login", async (body, {rejectWithValue}) => {
    //body = {email, password}
        try {
            const res = await axios.post("/auth/login", {email: body.email, password: body.password});
            const {username, userId, email, token, role} = res.data
            saveAccessToken(token);
        return {username, userId, email, role};
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "request error")
        }
    
})

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: USER_INFO_INITIAL_STATE,
    reducers: {
        logout: (state, action) => {
            state = USER_INFO_INITIAL_STATE;
            console.log("logout");
            localStorage.clear();
            return state
        },
        setUserError: (state, action) => {
            state.error.message = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(initUser.fulfilled, (state, {payload: {username, email, userId, role}}) => {
            state.info = {username, email, id:userId, role};
            state.isLoading = false;
            state.isLoggedIn = true;
        })
        .addCase(initUser.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(initUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            console.log(action.payload);
            localStorage.clear();
        })
        .addCase(loginUser.fulfilled, (state, {payload: {username, email, userId, role}}) => {
            state.isLoading = false;
            state.info = {username, email, id:userId, role};
            state.isLoggedIn = true;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = {message: action.payload}
            
        })
    }
});

const {logout, setUserError} = userInfoSlice.actions;

export {initUser, loginUser, logout, setUserError} ;

export default userInfoSlice.reducer;

