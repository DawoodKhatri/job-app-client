import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/redux/slices/authSlice";
import { ADMIN_JOB_FORM } from "@/constants/jobForm";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { CONTRACT_OPTIONS } from "@/constants/contract";
import { Textarea } from "../ui/textarea";
import { addJob, clearError, updateJob } from "@/redux/slices/jobsSlice";

const JobForm = ({ defaultValues, isUpdate }) => {
  const form = useForm({
    resolver: zodResolver(ADMIN_JOB_FORM),
    defaultValues: defaultValues ?? {
      company: "",
      position: "",
      contract: "",
      location: "",
      description: "",
    },
  });

  const { loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", description: error });
      dispatch(clearError());
    }
  }, [error]);

  const onSubmit = (data) => {
    if (!data.company || !data.position || !data.contract || !data.location) {
      return toast({
        variant: "destructive",
        description: "Please fill in all fields",
      });
    }
    dispatch(
      isUpdate
        ? updateJob({
            jobId: defaultValues._id,
            job: data,
            onSuccess: () => navigate("/jobs", { replace: true }),
          })
        : addJob({
            job: data,
            onSuccess: () => navigate("/jobs", { replace: true }),
          })
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex justify-center items-center p-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-10">
          <h1 className="text-4xl font-bold text-center text-primary">
            {isUpdate ? "Update" : "Add"} Job
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the job position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract</FormLabel>

                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the contract type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CONTRACT_OPTIONS.map(({ label, value }, index) => (
                          <SelectItem key={index} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the job location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the job description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mx-auto gap-2"
                type="submit"
                disabled={loading}
              >
                {loading && <LoaderCircle className="animate-spin" />}
                {isUpdate ? "Update" : "Add"} Job
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;
