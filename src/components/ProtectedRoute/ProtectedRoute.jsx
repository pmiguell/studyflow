import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../features/auth/services/tokenService";

function ProtectedRoute() {
  const isAuthenticated = !!getToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
