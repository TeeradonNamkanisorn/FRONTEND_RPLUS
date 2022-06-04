import React, { useId, useState } from 'react'
import axios from "../../../config/axios";
import { useDispatch } from 'react-redux';
import { fetchCourseAsync, setChapterLoading } from '../../../slices/courseSlice';
import { getAccessToken } from '../../../services/localStorage';
import bytesToSize from '../../../utils/bytesToSize';
import { isFileVideo } from '../../../utils/isFileVideo';
function LessonUpdater({lesson, courseId, setShowing}) {
    const textId = useId();
    const fileId = useId();
    const titleId = useId();
    const [videoFile, setVideoFile]= useState();
    const [ title, setTitle ]= useState(lesson.title || '');
    const [description, setDescription] = useState(lesson?.videoLesson?.description || '');
    const [videoFileError, setVideoFileError] = useState("");
    const [titleError, setTitleError]= useState("");
    const dispatch = useDispatch();

   
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            dispatch(setChapterLoading(true));
            const formData = new FormData();
            formData.append("lessonVideo", videoFile);
            formData.append('title', title);
            formData.append('description', description);
            await axios.put('/lesson/video/'+lesson.id, formData, {
                headers: {
                    authorization: "Bearer "+getAccessToken()
                }
            });
            dispatch(fetchCourseAsync({courseId}));
        } catch (error) {
            console.log("error")
        } finally {
            dispatch(setChapterLoading(false));
            setShowing(false);
        }
    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleVideoChange = e => {
        if (bytesToSize(e.target.files[0].size) > 1048576 * 200) {
            setVideoFileError("Video file may not exceed 200MB");
            e.target.files = [];
            return;
        } else if (!isFileVideo(e.target.files[0])) {
            setVideoFileError("Only a video is accepted");
            e.target.files = [];
            return;
        }
        setVideoFile(e.target.files[0]);
        e.target.files = [];
        setVideoFileError("");
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor={titleId} className="form-label">Change to a new title</label>
                <input type="text" className="form-control" id={titleId} onChange={handleTitleChange} value={title}/>
            </div>
            <div className="mb-3">
                <label htmlFor={fileId} className="form-label">Change the lesson file</label>
                <input className="form-control" type="file" id={fileId} onChange={handleVideoChange} />
                <div className='invalid-feedback'></div>
            </div>
            <div className="mb-3">
                <label htmlFor={textId}className="form-label" placeholder='enter new description'></label>
                <textarea className="form-control" id={textId} rows="3" onChange={e => setDescription(e.target.value)}
                value={description}></textarea>
            </div>
            <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-primary mx-auto'>Update</button>
            </div>
        </form>
    </>
  )
}

export default LessonUpdater