import { useGetProductsQuery } from "@/redux/api/productApi";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Custom hook to get the authentication token
const useAuthToken = () => {
  return useSelector((state: any) => state.auth.authData.token);
};

// Custom hook to get the login session

export const PrivateRoute: React.FC = () => {
  const token = useAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute: React.FC = () => {
  const token = useAuthToken();
  return token ? <Navigate to="/user/home" replace /> : <Outlet />;
};
