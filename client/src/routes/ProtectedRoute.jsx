import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
  return localStorage.getItem("user-scaler-bookshow") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
