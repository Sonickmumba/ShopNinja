// const checkAuthStatus = async (user, setUser) => {
  
//   try {
//     const response = await axios.get('http://localhost:3001/api/auth-status');
//     if (response.data.authenticated) {
//       setUser(response.data.user); // User is logged in
//     } else {
//       navigate('/login'); // Redirect to login page if not authenticated
//     }
//   } catch (error) {
//     console.error('Error checking auth status:', error);
//     navigate('/login'); // Redirect to login if there's an error
//   }
// };

// module.exports = checkAuthStatus;