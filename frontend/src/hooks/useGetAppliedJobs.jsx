import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setAllAppliedJobs(response.data.application)); 
                }
            } catch (error) {
                
            }
        }
        fetchAppliedJobs();
    }, [dispatch])
};

export default useGetAppliedJobs;
