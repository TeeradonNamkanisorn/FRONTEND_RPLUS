import { Link } from "react-router-dom"

function RegisterSelect() {
  return (
    <div className="container border d-flex flex-column vh-100 justify-content-center align-items-center">
        <div className="">
          <h2 className="my-5">You Are Registering As</h2>
          <div className="d-flex justify-content-center">
            <Link to="/register-teacher" className="mx-2">Teacher</Link>
            <button className="mx-2">Student</button>
          </div>
        </div>
    </div>
  )
}

export default RegisterSelect