import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(()=> {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/status', {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.message === "Authenticated")
        
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  },[]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default ProtectedRoute

