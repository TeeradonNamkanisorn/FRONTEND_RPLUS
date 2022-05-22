import { useState } from "react"

const CourseCreatorForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <div className="container">
      <form >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label offset-sm-1" htmlFor="name">Course Name: </label>
          <div className="col-sm-6 "> 
            <input className="is-invalid form-control" id="name" placeholder="Enter Course Name" onChange={e=>setName(e.target.value)}
            value={name}/>
            <div className="invalid-feedback">Input is required</div>
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
            <option value="all" selected>All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        

          
          
        </div>
      </form>
    </div>
  )
}

export default CourseCreatorForm