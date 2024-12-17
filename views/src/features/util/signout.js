// import { signOut } from "./features/login/userSlice";

const signout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "GET",
        credentials: "include", // Ensures cookies are included in the request
      });
  
      if (response.ok) {
        console.log("Successfully logged out");
        // Optionally redirect the user or update UI state
      } else {
        console.log("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  module.exports = signout;
  