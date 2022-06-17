import {
  createAsyncThunk,
  createNextState,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";

const INITIAL_STATE = {
  chapters: [],
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
    id: "",
  },
  isLoading: false,
  error: "",
  //exclusive to student mode
  numberCompleted: 0,
  numberLesson: 1,
  completedLessons: [], // "id1", "id2" etc...
  previouslyCompletedLessons: [], // "id1", "id2" etc...
};

const fetchCourseAsync = createAsyncThunk(
  "course/fetch",
  async (payload, thunkAPI) => {
    try {
      const { courseId } = payload;
      const res = await axios.get("/course/" + courseId);
      return res.data.course;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "request error"
      );
    }
  }
);

//only for student mode
const fetchStudentCourseAsync = createAsyncThunk(
  "studentCourse/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const { courseId } = payload;
      const res = await axios.get("/course/as-student/" + courseId);
      return res.data.course;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "request error"
      );
    }
  }
);

//The mark complete counterpart is defined after the create slice.
const unmarkCompleteAsync = createAsyncThunk(
  "lesson/unmark",
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonId } = payload;
      const res = await axios.delete("/student/lesson/" + lessonId);
      return { lessonId };
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || err.message || "request error"
      );
    }
  }
);

const remarkCompleteAsync = createAsyncThunk(
  "lesson/remark",
  async ({ lessonId }, { rejectWithValue }) => {
    try {
      await axios.post("/student/lesson/" + lessonId);
      return { lessonId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "request error"
      );
    }
  }
);


const courseSlice = createSlice({
  name: "course",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCompletedLesson: (state, action) => {
      state.completedLessons.push(action.payload.lessonId);
    },
    clearCourse: (state) => {
      state = INITIAL_STATE;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseAsync.fulfilled, (state, action) => {
        state = {
          ...action.payload,
          isLoading: false,
          error: "",
        };
        return state;
      })
      .addCase(fetchCourseAsync.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCourseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentCourseAsync.fulfilled, (state, action) => {
        state = {
          ...action.payload,
          isLoading: false,
          error: "",
        };
        return state;
      })
      .addCase(fetchStudentCourseAsync.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchStudentCourseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unmarkCompleteAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const { lessonId } = action.payload;
        const idx = state.completedLessons.findIndex((el) => el === lessonId);
        state.completedLessons.splice(idx, 1);
      })
      .addCase(unmarkCompleteAsync.pending, (state, action) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(unmarkCompleteAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(remarkCompleteAsync.fulfilled, (state, action) => {
        const { lessonId } = action.payload;
        state.error = "";
        state.isLoading = false;
        //Don't want duplicate ids in this array even though it's fine in this case
        state.completedLessons.push(lessonId);
        const idx = state.previouslyCompletedLessons.find(
          (el) => el === lessonId
        );
        state.previouslyCompletedLessons.splice(idx, 1);
      })
      
  },
});

const {
  setLoading: setCourseLoading,
  setError,
  addCompletedLesson,
  clearCourse,
} = courseSlice.actions;

function markLessonCompleteAsync({ lessonId }) {
  return async (dispatch, getState) => {
    try {
      dispatch(setCourseLoading(true));
      dispatch(setError(""))
      await axios.post("/student/lesson/" + lessonId);
      dispatch(addCompletedLesson({ lessonId }));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || err.message || "request error")
      );
    } finally {
      dispatch(setCourseLoading(false));
    }
  };
}

export default courseSlice.reducer;
export {
  fetchCourseAsync,
  setCourseLoading,
  fetchStudentCourseAsync,
  markLessonCompleteAsync,
  unmarkCompleteAsync,
  remarkCompleteAsync,
  setError as setCourseError,
  clearCourse
};
