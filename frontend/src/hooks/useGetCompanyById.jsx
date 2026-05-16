import axios from "axios";
import React, { useEffect } from "react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/${companyId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
