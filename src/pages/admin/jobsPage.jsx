import JobCard from "@/components/jobs/jobCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminJobsPage = () => {
  const { jobs, loading } = useSelector((state) => state.jobs);
  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-[calc(100vh-72px)] flex flex-col gap-8 p-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <h1 className="font-bold text-3xl text-primary underline">
          All Added Jobs
        </h1>
        <Button size="sm" asChild>
          <Link to="/jobs/new">
            <Plus />
            Add New Job
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <>
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
          </>
        ) : (
          jobs.map((job, index) => (
            <JobCard key={index} {...job} isAdmin={true} />
          ))
        )}
      </div>
      {!loading && jobs.length === 0 && (
        <div className="text-center text-lg font-semibold">No Jobs Added</div>
      )}
    </div>
  );
};

export default AdminJobsPage;
