import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PrivateRoute() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthorized(!!token);
  }, []);

  if (authorized === null) return null; // prevent flicker

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
}
