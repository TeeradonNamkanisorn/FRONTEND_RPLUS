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
        firstName: "",
        lastName: "",
        imageUrl: ""
    },
    error: "",
    isLoading: false,
    isLoggedIn: false
}

const initUser = createAsyncThunk("userInfo/init", async (arg, thunkApi) => {
    try {
        const token = getAccessToken();
        const res = await axios.get("/auth/");
        console.log(res.data)
        return res.data
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
            console.log(error)
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
            state.error= action.payload
        },
        setUserLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(initUser.fulfilled, (state, {payload}) => {
            state.info = payload;
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
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.info = payload
            state.isLoggedIn = true;
            state.error = "";
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = "";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
            
        })
    }
});

const {logout, setUserError, setUserLoading} = userInfoSlice.actions;

export {initUser, loginUser, logout, setUserError, setUserLoading} ;

export default userInfoSlice.reducer;

