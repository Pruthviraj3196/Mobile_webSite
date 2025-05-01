import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../redux/userSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://mobile-website-plj8.onrender.com/api/users/login', { email, password });
    const token = res.data.token;
    const decoded = JSON.parse(atob(token.split('.')[1]));
    dispatch(setUser({ token, role: decoded.role }));
    if (decoded.role === 'admin') navigate('/admin');
    else navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto mt-10">
    <input
      className="border p-2"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      type="email"
      autoComplete="email"
    />
    <input
      className="border p-2"
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      autoComplete="current-password"
    />
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
  </form>
  
  );
};

export default LoginPage;