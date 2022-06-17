import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from "../../config/axios"
import { setCourseError, setCourseLoading } from '../../slices/courseSlice';



function CertificateButton({courseId, percentage}) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState();

    const handleCheckCertificate = async() => {
        try {
            dispatch(setCourseLoading(true));
            dispatch(setCourseError(""));

            const res = await axios.post('/student/cert/'+courseId);
            setStatus(res.data.status);
        } catch (err) {
            dispatch(setCourseError(err.response?.data.message || err.message || "request error"));
        } finally {
            dispatch(setCourseLoading(false))
        }
    }

    const handleDownloadCert = async () => {
        try {
            dispatch(setCourseLoading(true));
            dispatch(setCourseError(""));
            const res = await axios.get('/student/cert/'+courseId, {
                responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();

        } catch (err) {
            console.log(err)
            dispatch(setCourseError(err.response?.data?.message || err.message || "request error"));
        } finally {
            dispatch(setCourseLoading(false))
        }
    }
  return (
    <div style={{maxWidth: 200}}>
    <button className='btn' style={{ color: "white",backgroundColor: "purple"}} 
    onClick={handleCheckCertificate}>Request for certficate</button>
    {(status === "JUST_COMPLETED") && <button className='btn btn-primary mt-3' onClick={handleDownloadCert}>Download Certificate</button>}
    {(status === "PREVIOUSLY_COMPLETED") && (
    <>
        <button className='btn btn-primary' onClick={handleDownloadCert}>Download Old Certificate</button>
        <p className='mt-3 font-5' style={{color: "gray"}}>Course already updated, study all the added lessons to update the certificate to date.</p>
    </>
    )
    }
    {(status === "ALREADY_COMPLETED") && (
        <>
            <button className='btn btn-primary mt-3 mb-2' onClick={handleDownloadCert}>Download Certificate</button>
           
        </>
    )}
    {(status === "NOT_COMPLETED") && <div className="alert alert-danger mt-3" role="alert">
        Please complete the course beforehand.
    </div>}
    </div>
  )
}

export default CertificateButton