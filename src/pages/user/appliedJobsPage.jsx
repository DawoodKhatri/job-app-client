import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/jobCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authHeaders } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const UserAppliedJobsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const getAppliedJobs = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/jobs/applied", {
        headers: authHeaders(),
      });

      if (!response.data.success) throw new Error(response.data.message);

      setJobs(response.data.data.jobs);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", description: error });
      navigate("/jobs");
    }
  }, [error]);

  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-[calc(100vh-72px)] flex flex-col gap-8 p-8">
      <div className="flex justify-center items-center gap-8">
        <h1 className="font-bold text-3xl text-primary underline">
          My Applied Jobs
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading && (
          <>
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
          </>
        )}

        {jobs.map((job, index) => (
          <JobCard key={index} {...job} readOnly={true} />
        ))}
      </div>

      {!loading && jobs.length === 0 && (
        <div className="text-center text-lg font-semibold">
          No Jobs Applied yet
        </div>
      )}
    </div>
  );
};

export default UserAppliedJobsPage;
