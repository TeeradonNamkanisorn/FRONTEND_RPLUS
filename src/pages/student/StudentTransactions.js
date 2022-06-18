import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import StudentTransTable from '../../components/layout/transaction/StudentTransTable';
import axios from "../../config/axios";

function StudentTransactions() {
    const [student, setStudent] = useState({
        courses: []
    });
    const [transError, setTransError] = useState("");
    const [loading, setLoading] = useState(false);

    //Transaction does not have its own slice.

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                setTransError("");

                const res = await axios.get('/student/transactions');
                console.log("student: ", res.data);
                setStudent(res.data.student);
            } catch (err) {
                setTransError(err.response?.data?.message || err.message || "request error")
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions();
    }, [])

  return (
    <div>
        <StudentTransTable student={student}/>
        <Toast error={transError}/>
        {loading && <Spinner/>}
    </div>
  )
}

export default StudentTransactions