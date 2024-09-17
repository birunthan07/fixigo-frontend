// 



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setMessage(''); // Clear message on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const endpoint = isSignup ? '/register' : '/login';
    const body = isSignup ? { username, email, password } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (data.token) {
          alert(isSignup ? 'Successfully registered!' : 'Successfully logged in!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          
          if (data.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/user'); // or any other page for regular users
          }
          
          setUsername('');
          setEmail('');
          setPassword('');
          setMessage('');
        } else {
          alert(data.message || 'An error occurred. Please try again.');
          setMessage(data.message || 'An error occurred. Please try again.');
        }
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        alert('Unexpected response format. Please check the console for more details.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('An error occurred. Please try again.');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>FixiGo</h1>
      </header>

      <input
        type="checkbox"
        id="signup_toggle"
        checked={isSignup}
        onChange={handleToggle}
        style={{ display: 'none' }} // Hide checkbox
      />
      <div className="form">
        {/* Login Form */}
        {!isSignup && (
          <div className="form_front">
            <div className="form_details">Login</div>
            <input
              className="input"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
            <div className="switch">
              Don't have an account?{' '}
              <span className="signup_tog" onClick={handleToggle}>
                Sign Up
              </span>
            </div>
          </div>
        )}
        {/* Signup Form */}
        {isSignup && (
          <div className="form_back">
            <div className="form_details">Sign Up</div>
            <input
              className="input"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <div className="switch">
              Already have an account?{' '}
              <span className="signup_tog" onClick={handleToggle}>
                Login
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginPage.css';

// const LoginPage = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsSignup(!isSignup);
//     setMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation for email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     const endpoint = isSignup ? '/register' : '/login';
//     const body = isSignup ? { username, email, password } : { email, password };

//     try {
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('role', data.user.role);
//         navigate(data.user.role === 'admin' ? '/admin' : '/user');
//       } else {
//         setMessage(data.error);
//       }
//     } catch (error) {
//       console.error('Error during login/signup:', error);
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
//       </form>
//       <p>{message}</p>
//       <button onClick={toggleForm}>
//         {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
//       </button>
//     </div>
//   );
// };

// export default LoginPage;
