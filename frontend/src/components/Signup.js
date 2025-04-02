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
      const response = await axios.post('http://localhost:3000/api/users/signup', { name, email, password });
      alert(response.data.msg);
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      alert(error.response.data.msg);
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
