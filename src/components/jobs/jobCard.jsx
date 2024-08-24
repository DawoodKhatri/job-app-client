import { ROLES } from "@/constants/roles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Building2, LoaderCircle, MapPin, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { CONTRACT_OPTIONS } from "@/constants/contract";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { updateJobStatus } from "@/redux/slices/jobsSlice";
import { applyForJob } from "@/redux/slices/userSlice";

const JobCard = ({
  _id,
  company,
  position,
  contract,
  location,
  description,
  active,
  applications,
  isAdmin,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const { jobs: userJobs } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">{position}</CardHeader>
      <CardContent className="space-y-1">
        <div className="flex flex-row gap-2 items-center">
          <Building2 className="size-4" />
          {company}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <MapPin className="size-4" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <Badge>
            {CONTRACT_OPTIONS.find(({ value }) => value === contract).label}
          </Badge>
          {isAdmin && <Badge>Applications: {applications}</Badge>}
        </div>
        {isAdmin && (
          <Button className="p-0 h-8" variant="link" asChild>
            <Link to={`/jobs/${_id}/applications`}>View Applications</Link>
          </Button>
        )}

        <p className="pt-4">
          {description ?? (
            <span className="text-muted-foreground">
              No description available
            </span>
          )}
        </p>
      </CardContent>
      {!readOnly && (
        <CardFooter>
          {isAdmin ? (
            <>
              <div className="flex items-center gap-2">
                <Switch
                  checked={active}
                  onCheckedChange={(checked) =>
                    dispatch(updateJobStatus({ jobId: _id, active: checked }))
                  }
                />
                <Label>{active ? "Active" : "InActive"}</Label>
              </div>
              <Button className="ml-auto" size="sm">
                <Link to={`/jobs/${_id}`}>
                  <Pencil className="inline size-4 mr-2" />
                  Edit
                </Link>
              </Button>
            </>
          ) : (
            <Button
              className="ml-auto gap-2"
              size="sm"
              disabled={loading || userJobs.includes(_id)}
              onClick={() => dispatch(applyForJob({ jobId: _id, setLoading }))}
            >
              {loading && <LoaderCircle className="animate-spin" />}
              {userJobs.includes(_id) ? "Applied" : "Apply"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default JobCard;
