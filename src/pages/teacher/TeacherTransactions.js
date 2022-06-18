import React, { useEffect, useState } from 'react'
import TeacherTransTable from '../../components/layout/transaction/TeacherTransTable'
import axios from "../../config/axios";

function TeacherTransactions() {
    const [teacher, setTeacher] = useState({ courses : []});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        const fetchTransaction = async () => {
            try {
                setError("");
                setLoading(true);
                const res = await axios.get('/teacher/transactions');
                setTeacher(res.data.teacher);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "request error")
            } finally {
                setLoading(false);
            }
        }

        fetchTransaction();

    }, [])
  return (
    <div>
        <TeacherTransTable teacher={teacher}/>
    </div>
  )
}

export default TeacherTransactions