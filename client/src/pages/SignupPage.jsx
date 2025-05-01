import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post('https://mobile-website-plj8.onrender.com/api/users/signup', { email, password, role });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80 mx-auto mt-10">
      <input className="border p-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <select className="border p-2" value={role} onChange={e => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Sign Up</button>
    </form>
  );
};

export default SignupPage;