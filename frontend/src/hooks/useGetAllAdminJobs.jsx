import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from "../redux/jobSlice"

const useGetAllAdminJobs = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}/adminjob`, {
                withCredentials: true
            })

            if(response.data.success){
                dispatch(setAllAdminJobs(response.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllJobs()
  }, []) 
}

export default useGetAllAdminJobs
