import { createSlice } from "@reduxjs/toolkit";

const globalErrorSlice = createSlice({
    name: "globalError",
    initialState: {
        message: ""
    },
    reducers: {
        setError: (state, action) => {
            state.message = action.payload;
        }
    }
});
export const setError = globalErrorSlice.actions.setError;
export default globalErrorSlice.reducer;
