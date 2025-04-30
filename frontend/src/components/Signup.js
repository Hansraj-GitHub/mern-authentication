import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../utility/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to sign up with:', { name, email });
      const response = await axios.post('https://mern-authentication-asxc.onrender.com/api/users/signup', { name, email, password });
      console.log('Signup response:', response.data);
      alert(response.data.msg);
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        alert(error.response.data.msg || 'An error occurred during signup');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <h1>SignUp</h1>
        <label>Enter Name</label>
        <input type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
        <label>Enter Email</label>
        <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Enter Password</label>
        <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='signup-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Signup;
