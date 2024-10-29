import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Home from "./pages/private/Home";
import ProductForm from "./pages/private/ProductForm";
import ProductList from "./pages/private/ProductList";
import { PrivateRoute, PublicRoute } from "./layouts/Auth/VerifyAuth";
import NotFoundPage from "./pages/NotFound-page/NotFound";
import Header from "./pages/Header";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        {/* Default redirect based on authentication */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user">
            <Route path="home" element={<Home />} />
            <Route path="form" element={<ProductForm />} />
            <Route path="list" element={<ProductList />} />
          </Route>
        </Route>

        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
