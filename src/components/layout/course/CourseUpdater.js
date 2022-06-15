import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { isFileImage } from '../../../utils/isFileImage';
import { isFileVideo } from '../../../utils/isFileVideo';
import axios from "../../../config/axios"
import { getAccessToken } from '../../../services/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseAsync, setCourseError, setCourseLoading } from '../../../slices/courseSlice';

function CourseUpdater({}) {
    //new redux logic
    const dispatch = useDispatch();
    const course = useSelector(state => state.course);
    const {name: initialCourseName, description: initialCourseDescription, level: initialLevel} = course;
    const videoRef = useRef(null);

  
    const [courseDescription, setCourseDescription] = useState("");
    const [courseName, setCourseName] = useState("");
    const [level, setLevel] = useState("all");
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [nameError, setNameError] = useState("");
    
    const [fileImageError, setFileImageError] = useState("");
    const [fileVideoError, setFileVideoError] = useState("");

    const handleCourseNameChange = (e) => {
      setCourseName(e.target.value)
    };
    
    const handleImageChange = (e) => {
        const currentFile = e.target.files[0];
        if (!isFileImage(currentFile)) {
            console.log('error');
            e.target.value = null;
            setFileImageError("Only image is accepted in this input");
            return;
        }
        //Must be less than 100MB
        if (currentFile.size > 1048576 * 10) {
          setFileImageError("The size may not exceed 10MB");
          e.target.value = null;
          return;
        }
        setFileImageError("");
        setImageFile(e.target.files[0]);
    };
    const handleVideoChange = (e) => {
        const currentFile = e.target.files[0];
        if (!isFileVideo(currentFile)) {
            console.log('error');
            e.target.value = null;
            setFileVideoError("Only accept videos");
            return;
    }
    if (currentFile.size > 1048576 * 200) {
      setFileVideoError("The size may not exceed 200MB");
      e.target.value = null;
      return;
    }
    setFileVideoError("");
        setVideoFile(e.target.files[0]);
    };
    
    const handleUpdateSubmit = async (e) => {
        try {
          e.preventDefault();
          dispatch(setCourseLoading(true));
          dispatch(setCourseError(""));

          const formData = new FormData();
          formData.append('preview-image', imageFile);
          formData.append('preview-video', videoFile);
          formData.append("name", courseName);
          formData.append("level", level);
          formData.append("description", courseDescription);
      

          await axios.put('/course/'+course.id, formData);
          dispatch(fetchCourseAsync({courseId:course.id}))
        } catch (error) {
          dispatch(setCourseError(error.response?.data?.message || error.message || "requestError"))
        } finally {
          dispatch(setCourseLoading(false))
        }
    };
    //Early code. Still works for now. Haven't refactored to redux yet.
    useEffect(() => {
       
        setCourseName(initialCourseName)
        setCourseDescription(initialCourseDescription);
        setLevel(initialLevel)
    }, [course])

    useEffect(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
    }, [course, videoFile])
  return (
    <>
         <form onSubmit={handleUpdateSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label offset-sm-1" htmlFor="name">Course Name: </label>
            <div className="col-sm-6 "> 
              <input className={`form-control ${nameError? "is-invalid" : ""}`} id="name" placeholder="Enter Course Name" onChange={handleCourseNameChange}
              value={courseName}/>
              <div className="invalid-feedback">{nameError}</div>
            </div>
        </div>

        
            <div className="form-group my-3 row">
                <label htmlFor="description" className='my-3 col-sm-2 col-form-label offset-sm-1'>Lesson description</label>
                <div className="col-sm-6"> 
                  <textarea rows='5' name = "description" id="description" className='from-control w-100'
                  value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}>
                      Enter details here...
                  </textarea>
                </div>
            </div>


        <div className="form-group row my-3">
          <label className="col-sm-2 col-form-label offset-sm-1" htmlFor="description">Level: </label>
          <div className='col-sm-1 d-flex align-items-center'>
            <select onChange={e => setLevel(e.target.value)} className="p-2" value={level}>
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="my-3 form-group row">
          <label htmlFor="formImage" className="form-label col-2 offset-sm-1" >Update Preview Image</label>
          <div className="col-5">
            <input className={`form-control ${fileImageError? 'is-invalid': ''}`} type="file" id="formImage" onChange={handleImageChange}/>
            <div className="invalid-feedback">{fileImageError}</div>
          </div>
          <img src={imageFile ? URL.createObjectURL(imageFile) : course.imageLink}
           className="d-block mx-auto my-3 " style={{maxWidth: 500, borderRadius: 10}}>
           </img>
           { imageFile && <div className="alert alert-info w-75 mx-auto" role="alert">
          Image Uploaded. Click update course header to save the image.
          </div>}
        </div>

        <div className="my-3 form-group row">
          <label htmlFor="formVideo" className="form-label col-2 offset-sm-1" >Update Preview Video</label>
          <div className="col-5">
            <input className={`form-control ${fileVideoError? 'is-invalid': ''}`} type="file" id="formVideo" onChange={handleVideoChange}/>
            <div className="invalid-feedback">{fileVideoError}</div>
          </div>
          <video style={{maxWidth: 600}} controls className="mx-auto my-3" ref={videoRef}>
            <source src={videoFile? URL.createObjectURL(videoFile) : course.videoLink}></source>
          </video>
          {videoFile && 
          <div className="alert alert-info w-75 mx-auto" role="alert">
          Video Uploaded. Click update course header to save the new video.
        </div>}
        </div>

        <div className="d-flex justify-content-center my-5">
          <button type="submit" className="btn btn-primary rounded-pill">Update Course Headers</button>
        </div>
        
      </form>
    </>
  )
}

export default CourseUpdater