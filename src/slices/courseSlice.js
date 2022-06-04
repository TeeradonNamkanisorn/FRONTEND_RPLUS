import { createAsyncThunk, createNextState, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";


const INITIAL_STATE = {chapters: [],
    id: "",
    name: "",
    imageLink: "",
    imagePublicId: "",
    videoLink: "",
    videoPublicId: "",
    description: "",
    level: "all",
    length: 0,
    isPublished: false,
    price: 0,
    createdAt: "",
    updatedAt: "1970-01-01T10:07:04.000Z",
    teacherId: "",
    isLoading: false, error: ""
}

const fetchCourseAsync = createAsyncThunk('course/fetch', async(payload, thunkAPI) => {
    try {
        const {courseId} = payload;
        const token = getAccessToken();
        const res = await axios.get('/course/'+courseId, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        
        return res.data.course

    } catch (error) {
        console.log('error')
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "request error")
    }
})


const courseSlice = createSlice({
    name: "course",
    initialState: INITIAL_STATE,
    reducers: {
        setLoading: (state, action) => {
            console.log(action.payload)
            state.isLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCourseAsync.fulfilled, (state, action) => {
            const {chapters,id, name, imageLink, videoLink, description,level, length, isPublished,price, createdAt, updatedAt,teacherId} = action.payload;
            state = {
                chapters,id, name, imageLink, videoLink, description,level, length, isPublished,price, createdAt, updatedAt,teacherId, isLoading: false, error: ""
            }
            return state
        })
        .addCase(
            fetchCourseAsync.pending, (state, action) => {
                state.isLoading = true;
            }
        ).addCase(fetchCourseAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

const setChapterLoading = courseSlice.actions.setLoading;

export default courseSlice.reducer;
export {fetchCourseAsync, setChapterLoading};
