// pages/UserPage.js
// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom'; // Import Navigate

// const UserPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setIsAuthenticated(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/auth/user/dashboard', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (response.status === 403) {
//           setIsAuthenticated(false);
//         } else {
//           const data = await response.json();
//           setUserData(data.user);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setIsAuthenticated(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (!userData) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <p><strong>Username:</strong> {userData.username}</p>
//       <p><strong>Email:</strong> {userData.email}</p>
//       <p><strong>Role:</strong> {userData.role}</p>
//     </div>
//   );
// };

// export default UserPage;





// 

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/user/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          const errorText = await response.text();
          console.error('Error fetching user data:', errorText);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    };


    fetchUserData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
};

export default UserPage;
