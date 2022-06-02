import { createAsyncThunk, createNextState, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";


const INITIAL_CHAPTERS = {chapters: [], isLoading: false}

const fetchChaptersAsync = createAsyncThunk('chapters/fetch', async(payload, thunkAPi) => {
    try {
        const {courseId} = payload;
        const token = getAccessToken();
        console.log('dispatching '+ courseId)
        const res = await axios.get('/chapter/'+courseId, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        
        return res.data.chapters

    } catch (error) {
        return thunkAPi.rejectWithValue(error?.response?.data?.message || "request error")
    }
})


const chapterSlice = createSlice({
    name: "chapters",
    initialState: INITIAL_CHAPTERS,
    reducers: {
        setLoading: (state, action) => {
            console.log(action.payload)
            state.isLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchChaptersAsync.fulfilled, (state, action) => {
            state.chapters = action.payload;
            state.isLoading = false;
        })
        .addCase(
            fetchChaptersAsync.pending, (state, action) => {
                state.isLoading = true;
            }
        )
    }
})

const setChapterLoading = chapterSlice.actions.setLoading;

export default chapterSlice.reducer;
export {fetchChaptersAsync, setChapterLoading};
