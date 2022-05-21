import {useState} from 'react';
import DragAndDrop from './DragAndDrop';

function CreateLessonForm() {
    const [content, setContent] = useState(null);
    const [contentType, setContentType] = useState("video");
    const [file, setFile] = useState(null);
    const [lessonName, setLessonName] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
  return (
    <div>
        <form className='text-center'>
            <div className='form-group row my-3'>
                <label htmlFor='lessonName' className='col-sm-4 col-form-label h3'>Lesson Name</label>
                <div className='col-sm-6'>
                    <input className='form-control' id="lessonName" onChange={e=>setLessonName(e.target.value)}></input>
                </div>
                <div className='invalid-feedback'>Validation Error</div>
            </div>
            <div className="form-group row my-3">
                <label htmlFor="description" className='col-sm-4 col-form-label h3 my-3'>Lesson description</label>
                <textarea rows='5' name = "description" id="description" className='col-6 from-control'
                value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)}>
                    Enter details here...
                </textarea>
            </div>
            <div className='form-group row my-3 vid-input-container'>
                <label htmlFor="file-upload" className='col-sm-3 col-form-label vid-input-label'>Upload video</label>
                <p className='col-sm-1 file-name'>File Name: {file?.name || "no file uploaded"}</p>
                {contentType === "video" && (  
                <div className='dragAndDropContainer col-sm-6'>
                    <div>
                        <DragAndDrop file={file} setFile={setFile} for="file-upload"/>
                    </div>
                </div>)}
            </div>
            <input type="file" id="file-upload"  onChange={(e) => setFile(e.target.files[0])} hidden/>
        </form>
        
    </div>
  )
}

export default CreateLessonForm