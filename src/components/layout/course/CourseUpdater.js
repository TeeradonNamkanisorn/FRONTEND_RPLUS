import React from 'react'
import { useState, useEffect } from 'react';
import { isFileImage } from '../../../utils/isFileImage';
import { isFileVideo } from '../../../utils/isFileVideo';
import axios from "../../../config/axios"
import { getAccessToken } from '../../../services/localStorage';

function CourseUpdater({courseId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
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
          const formData = new FormData();
          formData.append('preview-image', imageFile);
          formData.append('preview-video', videoFile);
          formData.append("name", courseName);
          formData.append("level", level);
          formData.append("description", courseDescription);
      
          setIsLoading(true);
          const result = await axios.put('/course/'+courseId, formData);
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
    };
    //Early code. Still works for now. Haven't refactored to redux yet.
    useEffect(() => {
        async function fetchCourse() {
            try {
                const token = getAccessToken();
                const res = await axios.get("/course/"+courseId);
                console.log(res.data);
                // course:
                // createdAt: "2022-05-24T05:09:28.000Z"
                // description: "Uploading a video and an image"
                // id: "59a73fbe-2b4b-4037-8ed7-95ab8be1c6fc"
                // imageLink: "http://res.cloudinary.com/dd59rpcj4/image/upload/v1653368959/9fdd6ade-0bca-4608-819d-b48c12663698video-camera-icon.png.png"
                // isPublished: false
                // length: 0
                // level: "intermediate"
                // name: "Third Course"
                // price: 0
                // teacherId: "25251e87-1e4f-4465-a3ac-732f3ea52962"
                // updatedAt: "2022-05-24T05:09:28.000Z"
                // videoLink: "http://res.cloudinary.com/dd59rpcj4/video/upload/v1653368967/cc7f44a2-1817-42a2-8733-6e16261c89e0Venice_5.mp4.mp4"
                setCourseName(res?.data?.course?.name);
                setCourseDescription(res?.data?.course?.description);
                setLevel(res?.data?.course?.level);
        } catch (err) {
            setApiError(err?.response?.data?.message || "request error") 
        }
        }
        fetchCourse();
    }, [courseId])
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
          <select onChange={e => setLevel(e.target.value)} className="col-sm-1" value={level}>
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="my-3 form-group row">
          <label htmlFor="formImage" className="form-label col-2 offset-sm-1" >Course Preview Image</label>
          <div className="col-5">
            <input className={`form-control ${fileImageError? 'is-invalid': ''}`} type="file" id="formImage" onChange={handleImageChange}/>
            <div className="invalid-feedback">{fileImageError}</div>
          </div>
        </div>

        <div className="my-3 form-group row">
          <label htmlFor="formVideo" className="form-label col-2 offset-sm-1" >Course Preview Video</label>
          <div className="col-5">
            <input className={`form-control ${fileVideoError? 'is-invalid': ''}`} type="file" id="formVideo" onChange={handleVideoChange}/>
            <div className="invalid-feedback">{fileVideoError}</div>
          </div>
        </div>

        <div className="d-flex justify-content-center my-5">
          <button type="submit" className="btn btn-primary rounded-pill">Update Course Headers</button>
        </div>
        {isLoading && 
        <div className="w-25 mx-auto">
            <div className="d-flex justify-content-between">
                <strong>Updating...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
        }
      </form>
    </>
  )
}

export default CourseUpdater