import {createSlice, configureStore} from '@reduxjs/toolkit';


const USER_INFO_INITIAL_STATE  = {
    id: localStorage.getItem("id") || "",
    username: localStorage.getItem("username") || ""
}
const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: USER_INFO_INITIAL_STATE,
    reducers: {
        signInUser: (state, action) => {
            const newPersonalInfo = {
                id: action.payload.id,
                username: action.payload.username
            };
            state = newPersonalInfo;
        }
    }
});

export const {signInUser} = userInfoSlice.actions;

export default userInfoSlice.reducer;

