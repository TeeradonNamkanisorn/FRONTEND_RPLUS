import { useState } from "react"
import { isFileImage } from "../../../utils/isFileImage";
import { isEmpty } from "../../../utils/validateFunctions";
import { isFileVideo } from "../../../utils/isFileVideo";
import axios from "../../../config/axios";
import { getAccessToken } from "../../../services/localStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CourseCreatorForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("all");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, isLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [fileVideoError, setFileVideoError] = useState("");
  const [fileImageError, setFileImageError] = useState("");


  const navigate = useNavigate();
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
    setImageFile(currentFile);
  }

  const handleVideoChange = e => {
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
    setVideoFile(currentFile);
  }

const handleNameChange = (e) => {
    const currentName = e.target.value;
    if (isEmpty(currentName)) {
      setNameError("Course name cannot be empty");
    } else {
      setNameError("");
    }
    setName(currentName);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nameError || fileImageError || fileVideoError) {
        alert("Invalid inputs");
        return;
      }
      const formData = new FormData();
      formData.append('preview-image', imageFile);
      formData.append('preview-video', videoFile);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("level", level);
      const result = await axios.post('/course/', formData, {headers: {
        authorization: 'Bearer '+ getAccessToken(),
        'Content-Type': "multipart/form-data"
      }});
      const courseId = result.data.id;
      navigate('/modify-course/'+courseId);
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label offset-sm-1" htmlFor="name">Course Name: </label>
            <div className="col-sm-6 "> 
              <input className={`form-control ${nameError? "is-invalid" : ""}`} id="name" placeholder="Enter Course Name" onChange={handleNameChange}
              value={name}/>
              <div className="invalid-feedback">{nameError}</div>
            </div>
        </div>

        
            <div className="form-group my-3 row">
                <label htmlFor="description" className='my-3 col-sm-2 col-form-label offset-sm-1'>Lesson description</label>
                <div className="col-sm-6"> 
                  <textarea rows='5' name = "description" id="description" className='from-control w-100'
                  value={description} onChange={(e) => setDescription(e.target.value)}>
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
          <button type="submit" className="btn btn-primary rounded-pill">Create Course</button>
        </div>

          
          
      </form>
    </div>
  )
}

export default CourseCreatorForm