import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../utility/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to login with:', { email });
      const response = await axios.post('https://mern-authentication.onrender.com/api/users/login', { email, password });
      console.log('Login response:', response.data);
      alert(response.data.msg);
      navigate("/home"); // Redirect to a dashboard page
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.msg || 'Invalid credentials');
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1>Login</h1>
        <label>Email</label>
        <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='login-button' onClick={handleSubmit}>Submit</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> 
      </div>
    </div>
  );
}

export default Login;
