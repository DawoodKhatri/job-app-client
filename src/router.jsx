import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/auth/loginPage";
import SignupPage from "./pages/auth/signupPage";
import AppNavbar from "./components/common/navbar";
import AdminJobsPage from "./pages/admin/jobsPage";
import { ROLES } from "./constants/roles";
import UserJobsPage from "./pages/user/jobsPage";
import { useSelector } from "react-redux";
import AdminAddJobPage from "./pages/admin/addJobPage";
import AdminUpdateJobPage from "./pages/admin/updateJobPage";
import NotFoundPage from "./pages/notFound";
import UserAppliedJobsPage from "./pages/user/appliedJobsPage";
import AdminJobApplicationsPage from "./pages/admin/jobApplicationsPage";

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { _id: userId, role } = useSelector((state) => state.user);
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}

        {isAuthenticated && userId && (
          <Route
            path="/jobs"
            element={
              role === ROLES.ADMIN ? <AdminJobsPage /> : <UserJobsPage />
            }
          ></Route>
        )}

        {isAuthenticated && userId && role === ROLES.ADMIN && (
          <>
            <Route path="/jobs/new" element={<AdminAddJobPage />} />
            <Route path="/jobs/:jobId" element={<AdminUpdateJobPage />} />
            <Route
              path="/jobs/:jobId/applications"
              element={<AdminJobApplicationsPage />}
            />
          </>
        )}

        {isAuthenticated && userId && role === ROLES.USER && (
          <>
            <Route path="/jobs/applied" element={<UserAppliedJobsPage />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
