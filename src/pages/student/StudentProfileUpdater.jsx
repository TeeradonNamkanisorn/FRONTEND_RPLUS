import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initUser, setUserError, setUserLoading } from '../../slices/userInfoSlice';
import { isFileImage } from '../../utils/isFileImage';
import axios from "../../config/axios";

function StudentProfileUpdater() {
    const user = useSelector(state => state.userInfo.info);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicError, setProfilePicError] = useState("");
    
    const dispatch = useDispatch();
    

    //validate as user enters a file
    const handleImageChange = e => {
        const currentFile = e.target.files[0]
        if (!currentFile) return setProfilePicError("profile pic is required");
        if (!isFileImage(currentFile)) {
            return setProfilePicError("The file must be an image");
        }
        if (currentFile.size > 1048576 * 10) return setProfilePicError("The image's size may not exceed 10MB")

        setProfilePic(e.target.files[0])
        setProfilePicError("");
        
    }

    const handleUpdateImage = async e => {
        try {
            const formData = new FormData();

            formData.append("profilePic", profilePic);

            dispatch(setUserLoading(true));
            dispatch(setUserError(""));

            await axios.patch('/auth/', formData);

            await dispatch(initUser());


        } catch (err) {
            console.log('caught erro')
            dispatch(setUserError(err.response?.data?.message || err.messsage || "request error please try again later"));
        } finally {
            dispatch(setUserLoading(false));
        }
    }

    useEffect(() => {
        setUsername(user.username);
        setFirstName(user.firstName);
        console.log(user.lastName);
        setLastName(user.lastName);
        
    }, [])

    

  return (
    <>
        <div className='row form-group my-3'>
            <label htmlFor="username" className="col-2 offset-1">username</label>
            <div className="col-4" id="username">
                <input className='form-control' type="text" value={username}/>
                <div className='invalid-feedback'>{usernameError}</div>
            </div>
        </div>
        <div className='row form-group my-3'>
            <label htmlFor="firstname" className="col-2 offset-1">First Name</label>
            <div className="col-4" id="">
                <input className='form-control' type="text" value={firstName}/>
                <div className='invalid-feedback'>{firstNameError}</div>
            </div>
        </div>
        <div className='row form-group my-3'>
            <label htmlFor="firstname" className="col-2 offset-1" >Last Name</label>
            <div className="col-4" id="">
                <input className='form-control' type="text" value={lastName}/>
                <div className='invalid-feedback'>{lastNameError}</div>
            </div>
        </div>
        
        <div className="my-3 form-group row align-items-center">
            <label htmlFor="formImage" className="form-label col-2 offset-sm-1" >Profile Image</label>
            <div className="col-5">
                <input className={`form-control ${profilePicError? 'is-invalid': ''}`} type="file" id="formImage" onChange={handleImageChange}/>
                <div className="invalid-feedback">{profilePicError}</div>
            </div>
            <img src={profilePic ? URL.createObjectURL(profilePic) : user.imageUrl}
            className="d-block my-3 col-1 " style={{maxWidth: 80, borderRadius: 5}}>
            </img>
            <button className='col-1 btn btn-primary' onClick={handleUpdateImage}>Save Image</button>
            { profilePic && <div className="alert alert-info w-75 mx-auto" role="alert">
            Click save new profile image to update.
            </div>}
        </div>
        
    </>
  )
}

export default StudentProfileUpdater