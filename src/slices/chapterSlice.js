import { createAsyncThunk, createNextState, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";


const INITIAL_CHAPTERS = {chapters: [], isLoading: false, error: ""}

const fetchChaptersAsync = createAsyncThunk('chapters/fetch', async(payload, thunkAPI) => {
    try {
        const {courseId} = payload;
        const token = getAccessToken();
        const res = await axios.get('/chapter/'+courseId, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        
        return res.data.chapters

    } catch (error) {
        console.log('error')
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "request error")
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
        ).addCase(fetchChaptersAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

const setChapterLoading = chapterSlice.actions.setLoading;

export default chapterSlice.reducer;
export {fetchChaptersAsync, setChapterLoading};
