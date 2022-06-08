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
    totalLength: 0,
    isPublished: false,
    price: 0,
    createdAt: "",
    updatedAt: "1970-01-01T10:07:04.000Z",
    teacherId: "",
    teacher: {
        firstName: "",
        lastName: "",
        id: ""
    },
    chapters: [],
    isLoading: false, error: ""
}

const fetchCourseAsync = createAsyncThunk('course/fetch', async(payload, thunkAPI) => {
    try {
        const {courseId} = payload;
        const token = getAccessToken();
        const res = await axios.get('/course/'+courseId);
        
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
            const {chapters,id, name, imageLink, videoLink, description,level, totalLength, isPublished,price, createdAt, updatedAt,teacherId, teacher} = action.payload;
            state = {
                chapters,id, name, imageLink, videoLink, description,level, totalLength, isPublished,price, createdAt, updatedAt,teacherId,teacher, isLoading: false, error: ""
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

const setCourseLoading = courseSlice.actions.setLoading;

export default courseSlice.reducer;
export {fetchCourseAsync, setCourseLoading};
