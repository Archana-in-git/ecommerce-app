import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, admin = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
