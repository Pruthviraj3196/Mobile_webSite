import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Redirector = () => {
  const { token, role } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(role === 'admin' ? '/admin' : '/home');
    } else {
      navigate('/login');
    }
  }, [token, role, navigate]);

  return null;
};

export default Redirector;
