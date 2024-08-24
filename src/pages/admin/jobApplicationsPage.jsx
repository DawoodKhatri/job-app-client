import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { authHeaders } from "@/lib/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminJobApplicationsPage = () => {
  const { jobId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applications, setApplicants] = useState([]);

  const navigate = useNavigate();

  const getApplicants = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/jobs/${jobId}/applications`, {
        headers: authHeaders(),
      });

      if (!response.data.success) throw new Error(response.data.message);

      setApplicants(response.data.data.applications);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    getApplicants();
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
          Applications
        </h1>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="w-full h-12 mb-4" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      ) : (
        <Table className="w-full max-w-screen-lg mx-auto">
          {applications.length === 0 && (
            <TableCaption>No Applications Available</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map(({ name, email }, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminJobApplicationsPage;
