import JobForm from "@/components/admin/jobForm";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AdminUpdateJobPage = () => {
  const { jobId } = useParams();
  const { jobs, loading } = useSelector((state) => state.jobs);

  const { _id: userId } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const jobDetails = jobs.find(({ _id }) => _id === jobId);

  useEffect(() => {
    if (userId && !loading && !jobDetails) {
      navigate("/jobs");
    }
  }, [userId, loading]);

  if (!jobDetails) return null;

  return <JobForm defaultValues={jobDetails} isUpdate={true} />;
};

export default AdminUpdateJobPage;
