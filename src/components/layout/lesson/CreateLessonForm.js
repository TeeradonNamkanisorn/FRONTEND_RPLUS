import axios from "../../../config/axios";
import {useState} from 'react';
import bytesToSize from '../../../utils/bytesToSize';
import DragAndDrop from '../../teacherUserInterfaces/DragAndDrop';
import { useNavigate, useParams } from "react-router-dom";
import { getAccessToken } from "../../../services/localStorage";
import { setChapterLoading } from "../../../slices/chapterSlice";
import { useDispatch } from "react-redux";

function CreateLessonForm() {
    const [contentType, setContentType] = useState("video");
    const [file, setFile] = useState(null);
    const [lessonName, setLessonName] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [videoError, setVideoError] = useState("");
    const {courseId,chapterId} = useParams();
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
            dispatch(setChapterLoading(true));
            if (contentType !== "video") return;
            if (file === null) return setVideoError("lecture material is required");
            const formData = new FormData();
            formData.append('lessonVideo', file);
            formData.append('title', lessonName);
            formData.append('chapterId', chapterId);
            formData.append('description', lessonDescription);
            setVideoError("");
            const res = await axios.post('/lesson/video', formData, {
                headers: {
                    authorization: "Bearer " + getAccessToken()
                }
            });
            navigate(`/modify-course/${courseId}`)

        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setChapterLoading(false));
        }


    }

  return (
    <div>
        <form className='text-center' onSubmit={handleSubmit}>
            <div className='lesson-name-input-container my-3'>
                <label htmlFor='lessonName' className='lesson-name-input-label'>Lesson Name</label>
                <input className='form-control lesson-name-input' id="lessonName" onChange={e=>setLessonName(e.target.value)}></input>
         
                <div className='invalid-feedback'>Validation Error</div>
            </div>
            <div className='lesson-type-input-container'>
                <label className='lesson-type-input-label' htmlFor="content-type">Select Lesson Type</label>
                <select id="content-type" className='lesson-type-input' onChange={e => setContentType(e.target.value)} value={contentType}>
                    <option value="video">Video</option>
                </select>
                <div className="form-text">Lesson type cannot be changed</div>
            </div>
            <div className="form-group my-3 lesson-description-input-container">
                <label htmlFor="description" className=' my-3 lesson-description-input-label'>Lesson description</label>
                <textarea rows='5' name = "description" id="description" className='from-control lesson-description-input'
                value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)}>
                    Enter details here...
                </textarea>
            </div>
            <div className='form-group my-3 vid-input-container'>
                <label htmlFor="file-upload" className='vid-input-label'>Upload video</label>
                <p className='file-name-label'>File Name: {file?.name || "no file uploaded"}</p>
                <p className="file-size-label">
                    File Size: {bytesToSize(file?.size || 0)}
                </p>
                {contentType === "video" && (  
                <div className='dragAndDropContainer'>
                    <DragAndDrop file={file} setFile={setFile} for="file-upload"/>

                </div>)}
            </div>
            <input type="file" id="file-upload"  onChange={(e) => setFile(e.target.files[0])} hidden/>
            <button type='submit' className="btn btn-primary mb-5">Create Lesson</button>
        </form>
        {/* {loading && <div className="w-25 mx-auto">
            <div className="d-flex justify-content-between">
                <strong>Uploading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>} */}
        
    </div>
  )
}

export default CreateLessonForm