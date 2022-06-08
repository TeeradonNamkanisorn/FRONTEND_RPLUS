import axios from "axios";
import {useEffect, useState, useReducer, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../utils/validateFunctions";
export default function RegisterStudent() {
    const navigate = useNavigate();
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfrimPassword] = useState("");


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfrimPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleFirstNameChange = e => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = e => {
        setLastName(e.target.value);
    }
    const handleEmailChange = (e) => {
        if(!isEmail(e.target.value)) {
            setEmailError("Invalid email format.");
        } else {
            setEmailError("");
        }
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
//
        //POST request

       try {
        if (passwordError || emailError || usernameError || firstNameError || lastNameError) {
            return alert("invalid input");
        }

        const requestBody = {
            username,
            email,
            password,
            firstName,
            lastName
        }

        const result = await axios.post("http://localhost:4000/auth/student", requestBody);
        navigate('/');
       } catch(err) {
           console.log(err?.response?.data?.message || err);
       }

        
    }

    useEffect( () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords must be the same.")
        } else {
            setPasswordError("");
        }
    }, [password, confirmPassword])

  return (
    <div className="container w-75">
        <h1>Sign up for free as student</h1>
        <div>
        <form onSubmit={handleSubmit} className="container">

        <div className="form-group row my-3">
            <label className="" htmlFor="usernameInput">Username</label>
            <input className={`form-control ${usernameError? "is-invalid" : ""}`} type="text" id="usernameInput"  placeholder="Enter username" onChange={handleUsernameChange}/>
            <div className="invalid-feedback">{usernameError}</div>
        </div>

        <div className="form-group row my-3">
            <label className="" htmlFor="firstNameInput">First Name</label>
            <input className={`form-control ${firstNameError? "is-invalid" : ""}`} type="text" id="firstNameInput"  placeholder="Enter first name" onChange={handleFirstNameChange}/>
            <div className="invalid-feedback">{firstNameError}</div>
        </div>
        <div className="form-group row my-3">
            <label className="" htmlFor="lastNameInput">Last Name</label>
            <input className={`form-control ${lastNameError? "is-invalid" : ""}`} type="text" id="lastNameInput"  placeholder="Enter username" onChange={handleLastNameChange}/>
            <div className="invalid-feedback">{lastNameError}</div>
        </div>

        <div className="form-group row my-3">
            <label className="" htmlFor="exampleInputEmail1">Email address</label>
            <input className={`form-control ${emailError? "is-invalid" : ""}`} type="email" id="exampleInputEmail1"  placeholder="Enter email" onChange={handleEmailChange}/>
            <div className="invalid-feedback">{emailError}</div>
        </div>

        <div className="form-group row my-3">
            <label className="" htmlFor="passwordInput">Password</label>
            <input className={`form-control ${passwordError? "is-invalid" : ""}`} type="password"  id="passwordInput"  placeholder="Enter password" onChange={handlePasswordChange}/>
            <div className="invalid-feedback">{passwordError}</div>
        </div>

        <div className="form-group row my-3">
            <label className="" htmlFor="confirmPasswordInput">Confirm Password</label>
            <input className="form-control" type="password"  id="confirmPasswordInput"  placeholder="Enter password" onChange={handleConfirmPasswordChange}/>
        </div>
        
        
       
        <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary">Go Back</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>

    </div>
  )
}
