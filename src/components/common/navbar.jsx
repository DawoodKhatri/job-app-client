import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { NotepadText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const AppNavbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <Link
        to="/"
        className="font-semibold text-3xl text-primary flex gap-2 items-center"
      >
        <NotepadText className="size-8" />
        <span>Job Find</span>
      </Link>
      <div className="flex justify-center items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/jobs">Jobs</Link>
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
