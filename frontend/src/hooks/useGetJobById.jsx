import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/${companyId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setSingleJob(response.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);
};

export default useGetJobById;
