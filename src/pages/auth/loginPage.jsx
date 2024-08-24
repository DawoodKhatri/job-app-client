import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_FORM_SCHEMA } from "@/constants/authForm";
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
import { LoaderCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { clearError, login } from "@/redux/slices/authSlice";

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", description: error });
      dispatch(clearError());
    }
  }, [error]);

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      return toast({
        variant: "destructive",
        description: "Please fill in all fields",
      });
    }
    dispatch(login(data));
  };

  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex justify-center items-center p-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-10">
          <h1 className="text-4xl font-bold text-center text-primary">Login</h1>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
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
                {loading && <LoaderCircle className="animate-apin" />}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
