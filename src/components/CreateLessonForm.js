import {useState} from 'react';
import bytesToSize from '../utils/bytesToSize';
import DragAndDrop from './DragAndDrop';

function CreateLessonForm() {
    const [content, setContent] = useState(null);
    const [contentType, setContentType] = useState("video");
    const [file, setFile] = useState(null);
    const [lessonName, setLessonName] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();

    }

  return (
    <div>
        <form className='text-center' onSubmit={handleSubmit}>
            <div className='form-group lesson-name-input-container my-3'>
                <label htmlFor='lessonName' className=' col-form-label lesson-name-input-label'>Lesson Name</label>
                <input className='form-control lesson-name-input' id="lessonName" onChange={e=>setLessonName(e.target.value)}></input>
         
                <div className='invalid-feedback'>Validation Error</div>
            </div>
            <div className='lesson-type-input-container'>
                <label className='lesson-type-input-label' htmlFor="content-type">Select Lesson Type</label>
                <select id="content-type" className='lesson-type-input' onChange={e => setContentType(e.target.value)}>
                    <option selected={true} value="video">Video</option>
                </select>
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
            <button type='submit'>Create Lesson</button>
        </form>
        
    </div>
  )
}

export default CreateLessonForm