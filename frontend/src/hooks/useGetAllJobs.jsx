import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from "../redux/jobSlice"

const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store=>store.job)
 
  useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}?keyword=${searchedQuery}`, {
                withCredentials: true
            })

            if(response.data.success){
                dispatch(setAllJobs(response.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllJobs()
  }, []) 
}

export default useGetAllJobs
