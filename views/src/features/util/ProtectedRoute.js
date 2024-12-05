import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(()=> {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/status', {
          method: "GET",
          credentials: "include",
        });
        console.log(response)
        const data = await response.json();
        console.log(data);
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
  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute

