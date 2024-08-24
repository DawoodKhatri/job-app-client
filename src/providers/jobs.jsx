import { ROLES } from "@/constants/roles";
import { getActiveJobs, getAllJobs } from "@/redux/slices/jobsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobsProvider = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { _id: userId, role } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    if (role === ROLES.ADMIN) {
      dispatch(getAllJobs());
    } else {
      dispatch(getActiveJobs());
    }
  }, [isAuthenticated, userId]);
  return children;
};

export default JobsProvider;
