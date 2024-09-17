// pages/AdminPage.js
// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom'; // Import Navigate

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   useEffect(() => {
//     // Check authentication status
//     const checkAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setIsAuthenticated(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/auth/admin', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (response.status === 403) {
//           setIsAuthenticated(false);
//         } else {
//           const data = await response.json();
//           setUsers(data);
//         }
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <h2>User List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPage;


// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setIsAuthenticated(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/auth/admin', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 403) {
//           setIsAuthenticated(false);
//         } else {
//           const data = await response.json();
//           setUsers(data);
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setIsAuthenticated(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <h2>User List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:5000/admin', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setUsers(data);
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await fetch(`http://localhost:5000/admin/delete/${userId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage('User deleted successfully!');
//       fetchUsers();  // Refresh the user list
//     } catch (err) {
//       console.error('Error deleting user:', err);
//       setMessage('Failed to delete user.');
//     }
//   };

//   const handleEdit = async (userId, updatedUser) => {
//     const token = localStorage.getItem('token');
//     try {
//       await fetch(`http://localhost:5000/admin/edit/${userId}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUser),
//       });
//       setMessage('User updated successfully!');
//       fetchUsers();  // Refresh the user list
//     } catch (err) {
//       console.error('Error updating user:', err);
//       setMessage('Failed to update user.');
//     }
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     handleEdit(selectedUser._id, selectedUser);
//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="admin-panel">
//       <h1>Admin Dashboard</h1>
//       <p>{message}</p>

//       {isLoading ? (
//         <p>Loading users...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <button onClick={() => handleEditClick(user)}>Edit</button>
//                   <button onClick={() => handleDelete(user._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {isEditing && (
//         <div className="edit-form">
//           <h2>Edit User</h2>
//           <input
//             type="text"
//             name="username"
//             value={selectedUser.username}
//             onChange={handleChange}
//             placeholder="Username"
//           />
//           <input
//             type="email"
//             name="email"
//             value={selectedUser.email}
//             onChange={handleChange}
//             placeholder="Email"
//           />
//           <select
//             name="role"
//             value={selectedUser.role}
//             onChange={handleChange}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button onClick={handleSaveClick}>Save Changes</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/admin/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('User deleted successfully!');
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Failed to delete user.');
    }
  };

  // Handle user edit
  const handleEdit = async (userId, updatedUser) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/admin/edit/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      setMessage('User updated successfully!');
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage('Failed to update user.');
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEdit(selectedUser._id, selectedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <p>{message}</p>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isEditing && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <input
            type="text"
            name="username"
            value={selectedUser.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={selectedUser.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <select
            name="role"
            value={selectedUser.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleSaveClick}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
