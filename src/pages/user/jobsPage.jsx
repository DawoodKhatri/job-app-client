import JobCard from "@/components/jobs/jobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTRACT_OPTIONS } from "@/constants/contract";
import { Building2, MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserJobsPage = () => {
  const { jobs, loading } = useSelector((state) => state.jobs);
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    contract: "all",
  });

  const getFilteredJobs = () => {
    let filteredJobs = jobs;

    if (filters.company) {
      filteredJobs = filteredJobs.filter(({ company }) =>
        company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter(({ location }) =>
        location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.contract && filters.contract !== "all") {
      filteredJobs = filteredJobs.filter(
        ({ contract }) => contract === filters.contract
      );
    }

    return filteredJobs;
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-[calc(100vh-72px)] flex flex-col gap-8 p-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <h1 className="font-bold text-3xl text-primary underline">
          All Posted Jobs
        </h1>
        <Button size="sm" asChild>
          <Link to="/jobs/applied">My Applied Jobs</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Button className="gap-2 w-full md:w-fit" variant="outline">
          <Search className="size-4" />
          Filters
        </Button>
        <Input
          className="flex-1"
          Icon={MapPin}
          placeholder="Location"
          value={filters.location}
          onChange={({ target: { value } }) =>
            setFilters({ ...filters, location: value })
          }
        />
        <Input
          className="flex-[3]"
          Icon={Building2}
          placeholder="Company"
          value={filters.company}
          onChange={({ target: { value } }) =>
            setFilters({ ...filters, company: value })
          }
        />
        <Select
          value={filters.contract}
          onValueChange={(value) => setFilters({ ...filters, contract: value })}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Contract type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {CONTRACT_OPTIONS.map(({ label, value }, index) => (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <>
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
            <Skeleton className="w-full aspect-[4/3]" />
          </>
        ) : (
          getFilteredJobs().map((job, index) => (
            <JobCard key={index} {...job} />
          ))
        )}
      </div>

      {!loading && getFilteredJobs().length === 0 && (
        <div className="text-center text-lg font-semibold">
          No Jobs Available
        </div>
      )}
    </div>
  );
};

export default UserJobsPage;
