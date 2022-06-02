import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../../config/axios";
import { getAccessToken } from '../../../services/localStorage';

const ChapterCreator = ({setShowing, fetchChapters}) => {
  const [chapterName, setChapterName] = useState("");
  const [chapterNameError, setChapterNameError] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const params = useParams();
  const courseId = params.courseId;

  const handleChapterNameChange = e => {
    setChapterName(e.target.value);
  }
  const handleClose = () => {
    if (setShowing) setShowing();
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const body = {
        name: chapterName,
        description: chapterDescription,
        courseId
      }
  
      const result = await axios.post('/chapter/appendChapter', body, {headers: {
        authorization: "Bearer " + getAccessToken()
      }});
      console.log(result.data);
      handleClose();
      fetchChapters();
      

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="form-group row" >
          <label className="col-sm-2 col-form-label offset-sm-1" htmlFor="name">Chapter Name: </label>
            <div className="col-sm-6 "> 
              <input className={`form-control ${chapterNameError? "is-invalid" : ""}`} id="name" placeholder="Enter Chapter Name" onChange={handleChapterNameChange}
              value={chapterName}/>
              <div className="invalid-feedback">{chapterNameError}</div>
            </div>
        </div>

        
            <div className="form-group my-3 row">
                <label htmlFor="description" className='my-3 col-sm-2 col-form-label offset-sm-1'>Chapter description</label>
                <div className="col-sm-6"> 
                  <textarea rows='5' name = "description" id="description" className='from-control w-100'
                  value={chapterDescription} onChange={(e) => setChapterDescription(e.target.value)}>
                      Enter details here...
                  </textarea>
                </div>
            </div>

        <div>
          
        </div>

        <div className="d-flex justify-content-center my-5">
          <button type="submit" className="btn btn-primary rounded-pill">Create Chapter</button>
          <button type="button" className="btn btn-secondary rounded-pill" onClick={()=>handleClose()}>Cancel</button>
        </div>
          
      </form>
    </>
  )
}

export default ChapterCreator