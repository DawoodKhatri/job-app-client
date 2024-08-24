import LoadingScreen from "@/components/common/loadingScreen";
import { checkAuthStatus } from "@/redux/slices/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { _id: userId, loading } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [isAuthenticated]);

  useEffect(() => {
    if (loading || (isAuthenticated && !userId)) return;

    if (!isAuthenticated && location.pathname.includes("/jobs")) {
      navigate("/login");
    }

    if (
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/jobs");
    }
  }, [loading, isAuthenticated, userId, location.pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  return children;
};

export default AuthProvider;
